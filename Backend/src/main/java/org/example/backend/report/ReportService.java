package org.example.backend.report;

import lombok.AllArgsConstructor;
import org.example.backend.mapper.ReportMapper;
import org.springframework.stereotype.Service;
import org.example.model.Report;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final ReportMapper reportMapper;

    public List<Report> getAllReports() {
        return reportMapper.toDto(reportRepository.findAll());
    }

    public Report getReportById(UUID id) {
        return reportMapper.toDto(reportRepository.findById(id).orElseThrow());
    }

    public Report createReport(Report report) {
        return reportMapper.toDto(reportRepository.save(reportMapper.toEntity(report)));
    }

    public Report updateReport(UUID id, Report report) {
        ReportEntity reportEntity = reportRepository.findById(id).orElseThrow();
        reportEntity.setStartDate(report.getStartDate());
        reportEntity.setEndDate(report.getEndDate());
        reportEntity.setType(report.getType());
        return reportMapper.toDto(reportRepository.save(reportEntity));
    }

    public void deleteReport(UUID id) {
        reportRepository.deleteById(id);
    }
}
