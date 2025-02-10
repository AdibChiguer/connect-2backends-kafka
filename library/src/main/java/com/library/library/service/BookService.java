package com.library.library.service;

import com.library.library.model.Book;
import com.library.library.model.Loan;
import com.library.library.model.LoanStatus;
import com.library.library.repository.BookRepository;
import com.library.library.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private LoanRepository loanRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    public Book getBookById(Long id) {
        return bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
    }
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    public List<Book> getAvailableBooks() {
        return bookRepository.findByAvailableCopiesGreaterThan(0);
    }

    public List<Book> getAvailableBooksForUser(Long userId) {
        List<Book> availableBooks = bookRepository.findByAvailableCopiesGreaterThan(0);

        List<Loan> borrowedLoans = loanRepository.findByBorrowerIdAndStatus(userId, LoanStatus.BORROWED);
        Set<Long> borrowedBookIds = borrowedLoans.stream()
                .map(loan -> loan.getBook().getId())
                .collect(Collectors.toSet());

        return availableBooks.stream()
                .filter(book -> !borrowedBookIds.contains(book.getId()))
                .collect(Collectors.toList());
    }
}