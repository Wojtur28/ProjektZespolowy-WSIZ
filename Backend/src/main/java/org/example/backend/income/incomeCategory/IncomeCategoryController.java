package org.example.backend.income.incomeCategory;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.example.api.IncomeCategoryApi;
import org.example.model.IncomeCategory;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
public class IncomeCategoryController implements IncomeCategoryApi {

    private final IncomeCategoryService incomeCategoryService;

    @Override
    public ResponseEntity<List<IncomeCategory>> getIncomeCategories() {
        return ResponseEntity.ok(incomeCategoryService.getIncomeCategories());
    }

    @Override
    public ResponseEntity<IncomeCategory> getIncomeCategory(UUID id) {
        return ResponseEntity.ok(incomeCategoryService.getIncomeCategory(id));
    }

    @Override
    public ResponseEntity<IncomeCategory> createIncomeCategory(IncomeCategory incomeCategory) {
        return ResponseEntity.ok(incomeCategoryService.createIncomeCategory(incomeCategory));
    }

    @Override
    public ResponseEntity<IncomeCategory> updateIncomeCategory(UUID id, IncomeCategory incomeCategory) {
        return ResponseEntity.ok(incomeCategoryService.updateIncomeCategory(id, incomeCategory));
    }

    @Override
    public ResponseEntity<Void> deleteIncomeCategory(UUID id) {
        incomeCategoryService.deleteIncomeCategory(id);
        return ResponseEntity.noContent().build();
    }
}
