package org.example.backend.income.incomeCategory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IncomeCategoryRepository extends JpaRepository<IncomeCategoryEntity, UUID>{
}
