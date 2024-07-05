package org.example.backend.forecast;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.example.api.ForecastApi;
import org.example.model.Forecast;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
public class ForecastController implements ForecastApi {

    private final ForecastService forecastService;

    @Override
    public ResponseEntity<List<Forecast>> getForecasts() {
        return ResponseEntity.ok(forecastService.getForecasts());
    }

    @Override
    public ResponseEntity<Forecast> getForecast(UUID id) {
        return ResponseEntity.ok(forecastService.getForecast(id));
    }

    @Override
    public ResponseEntity<Forecast> createForecast(Forecast forecast) {
        return ResponseEntity.ok(forecastService.createForecast(forecast));
    }

    @Override
    public ResponseEntity<Forecast> updateForecast(UUID id, Forecast forecast) {
        return ResponseEntity.ok(forecastService.updateForecast(id, forecast));
    }

    @Override
    public ResponseEntity<Void> deleteForecast(UUID id) {
        forecastService.deleteForecast(id);
        return ResponseEntity.noContent().build();
    }

}
