package org.example.backend.expense;

import lombok.AllArgsConstructor;
import org.example.backend.mapper.ExpenseCategoryMapper;
import org.example.backend.mapper.ExpenseMapper;
import org.example.backend.user.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import org.example.model.Expense;

@Service
@AllArgsConstructor
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final ExpenseMapper expenseMapper;
    private final ExpenseCategoryMapper expenseCategoryMapper;
    private final UserRepository userRepository;


    public List<Expense> getExpenses() {
        return expenseMapper.toDto(expenseRepository.findAll());
    }

    public Expense getExpense(UUID id) {
        return expenseRepository.findById(id)
                .map(expenseMapper::toDto)
                .orElse(null);
    }

    public Expense createExpense(Expense expense) {
        ExpenseEntity expenseEntity = expenseMapper.toEntity(expense);

        expenseEntity.setUser(userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(
                        () -> new RuntimeException("User not found")
                ));

        return expenseMapper.toDto(expenseRepository.save(expenseEntity));
    }

    public Expense updateExpense(UUID id, Expense expense) {
        // TODO: Implement ExpenseEntity exception handling
        ExpenseEntity expenseEntity = expenseRepository.findById(id).orElseThrow();

        expenseEntity.setAmount(expense.getAmount());
        expenseEntity.setDate(expense.getDate());
        expenseEntity.setCategory(expenseCategoryMapper.toEntity(expense.getCategory()));

        return expenseMapper.toDto(expenseRepository.save(expenseEntity));
    }

    public void deleteExpense(UUID id) {
        expenseRepository.deleteById(id);
    }
}