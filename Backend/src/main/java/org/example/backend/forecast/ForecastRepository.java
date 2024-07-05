package org.example.backend.forecast;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ForecastRepository extends JpaRepository<ForecastEntity, UUID> {
}
