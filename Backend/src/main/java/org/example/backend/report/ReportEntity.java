package org.example.backend.report;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.backend.AuditBase;
import org.example.backend.user.UserEntity;

import java.time.LocalDate;

@Entity
@Table(name = "reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReportEntity extends AuditBase {

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private String type;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

}

