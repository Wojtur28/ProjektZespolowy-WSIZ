package org.example.backend.mapper;

import org.example.backend.transaction.TransactionEntity;
import org.mapstruct.Mapper;
import org.example.model.Transaction;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

    TransactionEntity toEntity(Transaction transaction);

    Transaction toDto(TransactionEntity entity);

    List<Transaction> toDto(List<TransactionEntity> entities);

    List<TransactionEntity> toEntity(List<Transaction> transactions);
}
