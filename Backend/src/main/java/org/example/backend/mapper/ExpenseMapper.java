package org.example.backend.mapper;

import org.example.backend.expense.ExpenseEntity;

import java.util.List;
import org.example.model.Expense;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ExpenseMapper {

    Expense toDto(ExpenseEntity expenseEntity);

    List<Expense> toDto(List<ExpenseEntity> expenseEntities);

    ExpenseEntity toEntity(Expense expenseDTO);
}
