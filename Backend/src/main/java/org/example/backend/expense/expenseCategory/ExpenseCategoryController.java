package org.example.backend.expense.expenseCategory;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.example.api.ExpenseCategoryApi;
import org.example.model.ExpenseCategory;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
public class ExpenseCategoryController implements ExpenseCategoryApi {

    private final ExpenseCategoryService expenseCategoryService;

    @Override
    public ResponseEntity<List<ExpenseCategory>> getExpenseCategories() {
        return ResponseEntity.ok(expenseCategoryService.getExpenseCategories());
    }

    @Override
    public ResponseEntity<ExpenseCategory> getExpenseCategory(UUID id) {
        return ResponseEntity.ok(expenseCategoryService.getExpenseCategory(id));
    }

    @Override
    public ResponseEntity<ExpenseCategory> createExpenseCategory(ExpenseCategory expenseCategory) {
        return ResponseEntity.ok(expenseCategoryService.createExpenseCategory(expenseCategory));
    }

    @Override
    public ResponseEntity<ExpenseCategory> updateExpenseCategory(UUID id, ExpenseCategory expenseCategory) {
        return ResponseEntity.ok(expenseCategoryService.updateExpenseCategory(id, expenseCategory));
    }

    @Override
    public ResponseEntity<Void> deleteExpenseCategory(UUID id) {
        expenseCategoryService.deleteExpenseCategory(id);
        return ResponseEntity.noContent().build();
    }
}
