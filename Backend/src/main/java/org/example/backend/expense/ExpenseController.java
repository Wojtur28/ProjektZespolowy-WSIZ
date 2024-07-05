package org.example.backend.expense;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.example.model.Expense;
import org.example.api.ExpenseApi;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
public class ExpenseController implements ExpenseApi {

    private final ExpenseService expenseService;

    @Override
    public ResponseEntity<List<Expense>> getExpenses() {
        return ResponseEntity.ok(expenseService.getExpenses());
    }

    @Override
    public ResponseEntity<Expense> getExpense(UUID id) {
        return ResponseEntity.ok(expenseService.getExpense(id));
    }

    @Override
    public ResponseEntity<Expense> createExpense(Expense expense) {
        return ResponseEntity.ok(expenseService.createExpense(expense));
    }

    @Override
    public ResponseEntity<Expense> updateExpense(UUID id, Expense expense) {
        return ResponseEntity.ok(expenseService.updateExpense(id, expense));
    }

    @Override
    public ResponseEntity<Void> deleteExpense(UUID id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}
