package org.example.backend.expense.expenseCategory;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.backend.AuditBase;

@Entity
@Table(name = "expense_categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseCategoryEntity extends AuditBase {

    @Column(nullable = false, unique = true)
    private String name;

}