package com.springdemo.librarymanagementbackend.repository;


import com.springdemo.librarymanagementbackend.model.LoanStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import com.springdemo.librarymanagementbackend.model.Loan;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    Optional<Loan> findByBookIdAndBorrowerIdAndStatus(Long bookId, Long borrowerId, LoanStatus status);
    List<Loan> findByBorrowerIdAndStatus(Long borrowerId, LoanStatus status);
}