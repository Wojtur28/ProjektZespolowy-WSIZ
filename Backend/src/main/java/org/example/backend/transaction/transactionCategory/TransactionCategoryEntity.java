package org.example.backend.transaction.transactionCategory;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.backend.AuditBase;
import org.example.backend.transaction.TransactionType;

@Entity
@Table(name = "transaction_categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionCategoryEntity extends AuditBase {

    @Column(nullable = false, unique = true)
    private String name;

    private double expenseLimit;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType type;
}
