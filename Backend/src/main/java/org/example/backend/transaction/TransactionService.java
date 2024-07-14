package org.example.backend.transaction;

import lombok.AllArgsConstructor;
import org.example.backend.mapper.TransactionCategoryMapper;
import org.example.backend.mapper.TransactionMapper;
import org.example.backend.user.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.example.model.Transaction;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;
    private final UserRepository userRepository;
    private final TransactionCategoryMapper transactionCategoryMapper;


    public Transaction getTransaction(UUID id) {
        return transactionMapper.toDto(transactionRepository.findById(id).orElseThrow());
    }

    public List<Transaction> getTransactions() {
        return transactionMapper.toDto(transactionRepository.findAll());
    }

    public Transaction createTransaction(Transaction transaction) {
        TransactionEntity transactionEntity = transactionMapper.toEntity(transaction);

        transactionEntity.setUser(userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(
                        () -> new RuntimeException("User not found")
                ));

        return transactionMapper.toDto(transactionRepository.save(transactionEntity));
    }

    public Transaction updateTransaction(UUID id, Transaction transaction) {
        TransactionEntity transactionEntity = transactionRepository.findById(id).orElseThrow();
        transactionEntity.setAmount(transaction.getAmount());
        transactionEntity.setDate(transaction.getDate());
        transactionEntity.setDescription(transaction.getDescription());
        transactionEntity.setCategory(transactionCategoryMapper.toEntity(transaction.getCategory()));
        transactionEntity.setType(TransactionType.valueOf(transaction.getType().name()));
        return transactionMapper.toDto(transactionRepository.save(transactionEntity));
    }

    public void deleteTransaction(UUID id) {
        transactionRepository.deleteById(id);
    }


}
