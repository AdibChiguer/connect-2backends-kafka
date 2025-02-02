package com.springdemo.librarymanagementbackend.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springdemo.librarymanagementbackend.model.Book;
import com.springdemo.librarymanagementbackend.repository.BookRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    public Book getBookById(Long id) {
        return bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
    }
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }
}