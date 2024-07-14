package org.example.backend.transaction.transactionCategory;

import lombok.AllArgsConstructor;
import org.example.backend.mapper.TransactionCategoryMapper;
import org.example.backend.transaction.TransactionType;
import org.springframework.stereotype.Service;
import org.example.model.TransactionCategory;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class TransactionCategoryService {

    private final TransactionCategoryRepository transactionCategoryRepository;
    private final TransactionCategoryMapper transactionCategoryMapper;

    public TransactionCategory getTransactionCategory(UUID id) {
        return transactionCategoryMapper.toDto(transactionCategoryRepository.findById(id).orElseThrow());
    }

    public List<TransactionCategory> getTransactionCategories() {
        return transactionCategoryMapper.toDto(transactionCategoryRepository.findAll());
    }

    public TransactionCategory createTransactionCategory(TransactionCategory transactionCategory) {
        TransactionCategoryEntity transactionCategoryEntity = transactionCategoryMapper.toEntity(transactionCategory);
        return transactionCategoryMapper.toDto(transactionCategoryRepository.save(transactionCategoryEntity));
    }

    public TransactionCategory updateTransactionCategory(UUID id, TransactionCategory transactionCategory) {
        TransactionCategoryEntity transactionCategoryEntity = transactionCategoryRepository.findById(id).orElseThrow();
        transactionCategoryEntity.setName(transactionCategory.getName());
        transactionCategoryEntity.setType(TransactionType.valueOf(transactionCategory.getType().name()));
        return transactionCategoryMapper.toDto(transactionCategoryRepository.save(transactionCategoryEntity));
    }

    public void deleteTransactionCategory(UUID id) {
        transactionCategoryRepository.deleteById(id);
    }
}
