package com.springdemo.librarymanagementbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.EnableKafka;

@SpringBootApplication
@EnableKafka
public class LibraryManagementBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(LibraryManagementBackendApplication.class, args);
    }
}
