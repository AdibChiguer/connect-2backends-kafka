package com.library.library.kafka;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.library.library.model.Loan;
import com.library.library.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaListenerService {
    @Autowired
    private LoanService loanService;


    @KafkaListener(topics = "book-loans", groupId = "library-group")
    public void handleBookLoanEvent(String message) {
        System.out.println("Received Kafka message: " + message);
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode event = objectMapper.readTree(message);

            Long userId = event.get("userId").asLong();
            Long bookId = event.get("bookId").asLong();
            String action = event.get("action").asText();

            if ("borrow".equals(action)) {
                loanService.borrowBook(bookId, userId);
            } else if ("return".equals(action)) {
                // Get Loan ID by bookId and userId (assuming one active loan per user)
                Loan loan = loanService.findLoanByBookAndUser(bookId, userId);
                if (loan != null) {
                    loanService.returnBook(loan.getId());
                }
            }
        } catch (Exception e) {
            System.err.println("Error processing Kafka message: " + e.getMessage());
        }
    }
}