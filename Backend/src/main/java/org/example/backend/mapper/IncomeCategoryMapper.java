package org.example.backend.mapper;

import org.example.backend.income.incomeCategory.IncomeCategoryEntity;
import org.mapstruct.Mapper;
import org.example.model.IncomeCategory;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IncomeCategoryMapper {

    IncomeCategory toDto(IncomeCategoryEntity incomeCategoryEntity);

    List<IncomeCategory> toDto(List<IncomeCategoryEntity> incomeCategoryEntities);

    IncomeCategoryEntity toEntity(IncomeCategory incomeCategory);
}
