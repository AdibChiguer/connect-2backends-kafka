package com.library.library.controller;

import com.library.library.model.Book;
import com.library.library.model.Loan;
import com.library.library.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
public class LoanController {
    @Autowired
    private LoanService loanService;

    @PostMapping("/borrow")
    public Loan borrowBook(@RequestParam Long bookId, @RequestParam Long borrowerId) {
        return loanService.borrowBook(bookId, borrowerId);
    }
    @PostMapping("/return/{loanId}")
    public Loan returnBook(@PathVariable Long loanId) {
        return loanService.returnBook(loanId);
    }

    @GetMapping("/borrowed/{userId}")
    public ResponseEntity<List<Book>> getBorrowedBooks(@PathVariable Long userId) {
        List<Book> books = loanService.getAllBorrowedBooksByUser(userId);
        return ResponseEntity.ok(books);
    }
}