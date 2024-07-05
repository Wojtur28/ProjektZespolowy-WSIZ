package org.example.backend.expense.expenseCategory;

import lombok.AllArgsConstructor;
import org.example.backend.mapper.ExpenseCategoryMapper;
import org.springframework.stereotype.Service;
import org.example.model.ExpenseCategory;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ExpenseCategoryService {

    private final ExpenseCategoryRepository expenseCategoryRepository;
    private final ExpenseCategoryMapper expenseCategoryMapper;

    public List<ExpenseCategory> getAllExpenseCategories() {
        return expenseCategoryMapper.toDto(expenseCategoryRepository.findAll());
    }

    public ExpenseCategory getExpenseCategoryById(UUID id) {
        return expenseCategoryMapper.toDto(expenseCategoryRepository.findById(id).orElseThrow());
    }

    public ExpenseCategory createExpenseCategory(ExpenseCategory expenseCategory) {
        return expenseCategoryMapper.toDto(expenseCategoryRepository.save(expenseCategoryMapper.toEntity(expenseCategory)));
    }

    public ExpenseCategory updateExpenseCategory(UUID id, ExpenseCategory expenseCategory) {
        ExpenseCategoryEntity expenseCategoryEntity = expenseCategoryRepository.findById(id).orElseThrow();
        expenseCategoryEntity.setName(expenseCategory.getName());
        return expenseCategoryMapper.toDto(expenseCategoryRepository.save(expenseCategoryEntity));
    }

    public void deleteExpenseCategory(UUID id) {
        expenseCategoryRepository.deleteById(id);
    }
}
