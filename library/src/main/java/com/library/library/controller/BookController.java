package com.library.library.controller;

import com.library.library.model.Book;
import com.library.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }

    @GetMapping("/available")
    public List<Book> getAvailableBooks() { return bookService.getAvailableBooks(); }

    @GetMapping("/available/{userId}")
    public ResponseEntity<List<Book>> getAvailableBooksForUser(@PathVariable Long userId) {
        List<Book> books = bookService.getAvailableBooksForUser(userId);
        return ResponseEntity.ok(books);
    }
}