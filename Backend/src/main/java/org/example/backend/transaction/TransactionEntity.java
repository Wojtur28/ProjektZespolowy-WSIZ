package org.example.backend.transaction;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.backend.AuditBase;
import org.example.backend.transaction.transactionCategory.TransactionCategoryEntity;
import org.example.backend.user.UserEntity;

import java.time.LocalDate;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionEntity extends AuditBase {

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private LocalDate date;

    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private TransactionCategoryEntity category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType type;
}

