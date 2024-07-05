package org.example.backend.income.incomeCategory;

import lombok.AllArgsConstructor;
import org.example.backend.mapper.IncomeCategoryMapper;
import org.springframework.stereotype.Service;
import org.example.model.IncomeCategory;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class IncomeCategoryService {

    private final IncomeCategoryRepository incomeCategoryRepository;
    private final IncomeCategoryMapper incomeCategoryMapper;

    public List<IncomeCategory> getAllIncomeCategories() {
        return incomeCategoryMapper.toDto(incomeCategoryRepository.findAll());
    }

    public IncomeCategory getIncomeCategoryById(UUID id) {
        return incomeCategoryMapper.toDto(incomeCategoryRepository.findById(id).orElseThrow());
    }

    public IncomeCategory createIncomeCategory(IncomeCategory incomeCategory) {
        return incomeCategoryMapper.toDto(incomeCategoryRepository.save(incomeCategoryMapper.toEntity(incomeCategory)));
    }

    public IncomeCategory updateIncomeCategory(UUID id, IncomeCategory incomeCategory) {
        IncomeCategoryEntity incomeCategoryEntity = incomeCategoryRepository.findById(id).orElseThrow();
        incomeCategoryEntity.setName(incomeCategory.getName());
        return incomeCategoryMapper.toDto(incomeCategoryRepository.save(incomeCategoryEntity));
    }

    public void deleteIncomeCategory(UUID id) {
        incomeCategoryRepository.deleteById(id);
    }
}
