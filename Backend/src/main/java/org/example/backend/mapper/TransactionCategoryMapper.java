package org.example.backend.mapper;

import org.example.backend.transaction.transactionCategory.TransactionCategoryEntity;
import org.mapstruct.Mapper;
import org.example.model.TransactionCategory;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TransactionCategoryMapper {

    TransactionCategory toDto(TransactionCategoryEntity entity);

    TransactionCategoryEntity toEntity(TransactionCategory dto);

    List<TransactionCategory> toDto(List<TransactionCategoryEntity> entities);

    List<TransactionCategoryEntity> toEntity(List<TransactionCategory> dtos);
}
