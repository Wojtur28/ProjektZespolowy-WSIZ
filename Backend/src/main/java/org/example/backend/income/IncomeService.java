package org.example.backend.income;

import lombok.AllArgsConstructor;
import org.example.backend.mapper.IncomeCategoryMapper;
import org.example.backend.mapper.IncomeMapper;
import org.springframework.stereotype.Service;
import org.example.model.Income;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class IncomeService {

    private final IncomeRepository incomeRepository;
    private final IncomeMapper incomeMapper;
    private final IncomeCategoryMapper incomeCategoryMapper;

    public List<Income> getIncomes() {
        return incomeMapper.toDto(incomeRepository.findAll());
    }

    public Optional<Income> getIncome(UUID id) {
        return incomeRepository.findById(id).map(incomeMapper::toDto);
    }

    public Income createIncome(Income income) {
        IncomeEntity incomeEntity = incomeMapper.toEntity(income);
        return incomeMapper.toDto(incomeRepository.save(incomeEntity));
    }

    public Income updateIncome(UUID id, Income income) {
        // TODO: Implement Income exception handling
        IncomeEntity incomeEntity = incomeRepository.findById(id).orElseThrow();
        incomeEntity.setAmount(income.getAmount());
        incomeEntity.setCategory(incomeCategoryMapper.toEntity(income.getCategory()));
        incomeEntity.setDate(income.getDate());
        return incomeMapper.toDto(incomeRepository.save(incomeEntity));
    }

    public void deleteIncome(UUID id) {
        incomeRepository.deleteById(id);
    }
}
