// LoanController.java
package com.springdemo.librarymanagementbackend.controller;

import com.springdemo.librarymanagementbackend.model.Book;
import com.springdemo.librarymanagementbackend.model.Loan;
import com.springdemo.librarymanagementbackend.service.LoanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
public class LoanController {
    private final LoanService loanService;
    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

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