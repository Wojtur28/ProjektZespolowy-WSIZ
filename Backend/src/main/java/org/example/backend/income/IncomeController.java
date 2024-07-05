package org.example.backend.income;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.example.api.IncomeApi;
import org.example.model.Income;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
public class IncomeController implements IncomeApi {

    private final IncomeService incomeService;

    @Override
    public ResponseEntity<List<Income>> getIncomes() {
        return ResponseEntity.ok(incomeService.getIncomes());
    }

    @Override
    public ResponseEntity<Income> getIncome(UUID id) {
        return incomeService.getIncome(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @Override
    public ResponseEntity<Income> createIncome(Income income) {
        return ResponseEntity.ok(incomeService.createIncome(income));
    }

    @Override
    public ResponseEntity<Income> updateIncome(UUID id, Income income) {
        return ResponseEntity.ok(incomeService.updateIncome(id, income));
    }

    @Override
    public ResponseEntity<Void> deleteIncome(UUID id) {
        incomeService.deleteIncome(id);
        return ResponseEntity.noContent().build();
    }
}
