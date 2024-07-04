package org.example.backend.forecast;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.example.backend.AuditBase;
import org.example.backend.user.UserEntity;

import java.time.LocalDate;

@Entity
@Table(name = "forecasts")
@Getter
@Setter

public class ForecastEntity extends AuditBase {

    @Column(nullable = false)
    private LocalDate forecastDate;

    @Column(nullable = false)
    private Double predictedAmount;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(nullable = false)
    private String type;
}

