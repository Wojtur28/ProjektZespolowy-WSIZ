package org.example.backend.transaction.transactionCategory;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.example.api.TransactionCategoryApi;
import org.example.model.TransactionCategory;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
public class TransactionCategoryController implements TransactionCategoryApi {

    private final TransactionCategoryService transactionCategoryService;

    @Override
    public ResponseEntity<TransactionCategory> getTransactionCategory(UUID id) {
        return ResponseEntity.ok(transactionCategoryService.getTransactionCategory(id));
    }

    @Override
    public ResponseEntity<List<TransactionCategory>> getTransactionCategories() {
        return ResponseEntity.ok(transactionCategoryService.getTransactionCategories());
    }

    @Override
    public ResponseEntity<TransactionCategory> createTransactionCategory(TransactionCategory transactionCategory) {
        return ResponseEntity.ok(transactionCategoryService.createTransactionCategory(transactionCategory));
    }

    @Override
    public ResponseEntity<TransactionCategory> updateTransactionCategory(UUID id, TransactionCategory transactionCategory) {
        return ResponseEntity.ok(transactionCategoryService.updateTransactionCategory(id, transactionCategory));
    }

    @Override
    public ResponseEntity<Void> deleteTransactionCategory(UUID id) {
        transactionCategoryService.deleteTransactionCategory(id);
        return ResponseEntity.noContent().build();
    }
}
