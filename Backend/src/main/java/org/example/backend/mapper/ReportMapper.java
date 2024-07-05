package org.example.backend.mapper;

import org.example.backend.report.ReportEntity;
import org.example.model.Report;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReportMapper {

    Report toDto(ReportEntity reportEntity);

    List<Report> toDto(List<ReportEntity> reportEntities);

    ReportEntity toEntity(Report report);
}
