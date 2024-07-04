package org.example.backend.income;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.backend.AuditBase;

@Entity
@Table(name = "income_categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IncomeCategoryEntity extends AuditBase {

    @Column(nullable = false, unique = true)
    private String name;


}

