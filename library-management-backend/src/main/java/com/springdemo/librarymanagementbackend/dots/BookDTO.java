package com.springdemo.librarymanagementbackend.dots;

import lombok.Getter;
import org.springframework.stereotype.Component;

@Component
@Getter
public class BookDTO {
    private String isbn;
    private String title;
    private String author;
    private String category;
    private int publicationYear;
    private int totalCopies;
}
