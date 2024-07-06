package org.example.backend.report;

import lombok.AllArgsConstructor;
import org.example.backend.mapper.ReportMapper;
import org.example.backend.user.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.example.model.Report;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final ReportMapper reportMapper;
    private final UserRepository userRepository;

    public List<Report> getReports() {
        return reportMapper.toDto(reportRepository.findAll());
    }

    public Report getReport(UUID id) {
        return reportMapper.toDto(reportRepository.findById(id).orElseThrow());
    }

    public Report createReport(Report report) {
        ReportEntity reportEntity = reportMapper.toEntity(report);

        reportEntity.setUser(userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(
                        () -> new RuntimeException("User not found")
                ));

        return reportMapper.toDto(reportRepository.save(reportEntity));

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
