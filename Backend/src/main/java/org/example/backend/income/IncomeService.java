package org.example.backend.income;

import lombok.AllArgsConstructor;
import org.example.backend.mapper.IncomeCategoryMapper;
import org.example.backend.mapper.IncomeMapper;
import org.example.backend.user.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final UserRepository userRepository;

    public List<Income> getIncomes() {
        return incomeMapper.toDto(incomeRepository.findAll());
    }

    public Optional<Income> getIncome(UUID id) {
        return incomeRepository.findById(id).map(incomeMapper::toDto);
    }

    public Income createIncome(Income income) {
        IncomeEntity incomeEntity = incomeMapper.toEntity(income);

        incomeEntity.setUser(userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(
                        () -> new RuntimeException("User not found")
                ));

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
