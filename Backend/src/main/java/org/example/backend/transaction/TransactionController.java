package org.example.backend.transaction;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.example.api.TransactionApi;
import org.example.model.Transaction;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
public class TransactionController implements TransactionApi {

    private final TransactionService transactionService;

    @Override
    public ResponseEntity<List<Transaction>> getTransactions() {
        return ResponseEntity.ok(transactionService.getTransactions());
    }

    @Override
    public ResponseEntity<Transaction> getTransaction(UUID id) {
        return ResponseEntity.ok(transactionService.getTransaction(id));
    }

    @Override
    public ResponseEntity<Transaction> createTransaction(Transaction transaction) {
        return ResponseEntity.ok(transactionService.createTransaction(transaction));
    }

    @Override
    public ResponseEntity<Transaction> updateTransaction(UUID id, Transaction transaction) {
        return ResponseEntity.ok(transactionService.updateTransaction(id, transaction));
    }

    @Override
    public ResponseEntity<Void> deleteTransaction(UUID id) {
        transactionService.deleteTransaction(id);
        return ResponseEntity.noContent().build();
    }
}
