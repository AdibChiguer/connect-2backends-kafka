package com.springdemo.librarymanagementbackend.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.springdemo.librarymanagementbackend.model.Book;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByAvailableCopiesGreaterThan(int availableCopies);
}