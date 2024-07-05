package org.example.backend.income;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.backend.AuditBase;
import org.example.backend.income.incomeCategory.IncomeCategoryEntity;
import org.example.backend.user.UserEntity;

import java.time.LocalDate;

@Entity
@Table(name = "incomes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class IncomeEntity extends AuditBase {

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private IncomeCategoryEntity category;

}
