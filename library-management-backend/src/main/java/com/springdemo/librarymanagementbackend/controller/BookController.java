// BookController.java
package com.springdemo.librarymanagementbackend.controller;

import com.springdemo.librarymanagementbackend.dots.BookDTO;
import com.springdemo.librarymanagementbackend.model.Book;
import com.springdemo.librarymanagementbackend.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {
    private final BookService bookService;
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> getAllBooks() {
        System.out.println("hi");
        return bookService.getAllBooks();
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

    @PostMapping
    public Book addBook(@RequestBody BookDTO book) {
        return bookService.addBook(book);
    }

    @GetMapping("/available/{userId}")
    public ResponseEntity<List<Book>> getAvailableBooksForUser(@PathVariable Long userId) {
        System.out.println("/available");
        List<Book> books = bookService.getAvailableBooksForUser(userId);
        return ResponseEntity.ok(books);
    }
}