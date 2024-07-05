package org.example.backend.mapper;

import org.example.backend.expense.expenseCategory.ExpenseCategoryEntity;
import org.mapstruct.Mapper;
import org.example.model.ExpenseCategory;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ExpenseCategoryMapper {

    ExpenseCategory toDto(ExpenseCategoryEntity expenseCategoryEntity);

    List<ExpenseCategory> toDto(List<ExpenseCategoryEntity> expenseCategoryEntities);

    ExpenseCategoryEntity toEntity(ExpenseCategory expenseCategory);
}
