package org.example.backend.mapper;

import org.example.backend.income.IncomeEntity;
import org.mapstruct.Mapper;
import java.util.List;
import org.example.model.Income;

@Mapper(componentModel = "spring")
public interface IncomeMapper {

    Income toDto(IncomeEntity incomeEntity);

    List<Income> toDto(List<IncomeEntity> incomeEntities);

    IncomeEntity toEntity(Income incomeDTO);
}

