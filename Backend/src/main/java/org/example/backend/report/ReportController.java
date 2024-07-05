package org.example.backend.report;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.example.api.ReportApi;
import org.example.model.Report;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
public class ReportController implements ReportApi {

    private final ReportService reportService;
    @Override
    public ResponseEntity<List<Report>> getReports() {
        return ResponseEntity.ok(reportService.getReports());
    }

    @Override
    public ResponseEntity<Report> getReport(UUID id) {
        return ResponseEntity.ok(reportService.getReport(id));
    }

    @Override
    public ResponseEntity<Report> createReport(Report report) {
        return ResponseEntity.ok(reportService.createReport(report));
    }

    @Override
    public ResponseEntity<Report> updateReport(UUID id, Report report) {
        return ResponseEntity.ok(reportService.updateReport(id, report));
    }

    @Override
    public ResponseEntity<Void> deleteReport(UUID id) {
        reportService.deleteReport(id);
        return ResponseEntity.noContent().build();
    }
}
