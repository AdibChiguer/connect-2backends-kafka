
// LoanService.java
package com.springdemo.librarymanagementbackend.service;

import com.springdemo.librarymanagementbackend.model.Book;
import com.springdemo.librarymanagementbackend.model.Loan;
import com.springdemo.librarymanagementbackend.model.LoanStatus;
import com.springdemo.librarymanagementbackend.repository.BookRepository;
import com.springdemo.librarymanagementbackend.repository.LoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LoanService {
    @Autowired
    private final LoanRepository loanRepository;
    @Autowired
    private final BookRepository bookRepository;

    public Loan borrowBook(Long bookId, Long borrowerId) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));
        if (book.getAvailableCopies() <= 0) {
            throw new RuntimeException("No copies available");
        }
        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookRepository.save(book);
        Loan loan = new Loan();
        loan.setBook(book);
        loan.setBorrowerId(borrowerId);
        loan.setLoanDate(LocalDate.now());
        loan.setStatus(LoanStatus.BORROWED);
        return loanRepository.save(loan);
    }

    public Loan returnBook(Long loanId) {
        Loan loan = loanRepository.findById(loanId).orElseThrow(() -> new RuntimeException("Loan not found"));
        Book book = loan.getBook();
        book.setAvailableCopies(book.getAvailableCopies() + 1);
        bookRepository.save(book);
        loan.setReturnDate(LocalDate.now());
        loan.setStatus(LoanStatus.RETURNED);
        return loanRepository.save(loan);
    }

    public Loan findLoanByBookAndUser(Long bookId, Long userId) {
        return loanRepository.findByBookIdAndBorrowerIdAndStatus(bookId, userId, LoanStatus.BORROWED)
                .orElseThrow(() -> new RuntimeException("Loan not found"));
    }

    public List<Book> getAllBorrowedBooksByUser(Long userId) {
        List<Loan> loans = loanRepository.findByBorrowerIdAndStatus(userId, LoanStatus.BORROWED);
        return loans.stream()
                .map(Loan::getBook)
                .collect(Collectors.toList());
    }
}