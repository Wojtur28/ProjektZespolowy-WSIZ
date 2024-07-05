package org.example.backend.forecast;

import lombok.AllArgsConstructor;
import org.example.backend.mapper.ForecastMapper;
import org.springframework.stereotype.Service;
import org.example.model.Forecast;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ForecastService {

    private final ForecastRepository forecastRepository;
    private final ForecastMapper forecastMapper;

    public List<Forecast> getForecasts() {
        return forecastMapper.toDto(forecastRepository.findAll());
    }

    public Forecast getForecast(UUID id) {
        return forecastMapper.toDto(forecastRepository.findById(id).orElseThrow());
    }

    public Forecast createForecast(Forecast forecast) {
        return forecastMapper.toDto(forecastRepository.save(forecastMapper.toEntity(forecast)));
    }

    public Forecast updateForecast(UUID id, Forecast forecast) {
        ForecastEntity forecastEntity = forecastRepository.findById(id).orElseThrow();
        forecastEntity.setForecastDate(forecast.getForecastDate());
        forecastEntity.setPredictedAmount(forecast.getPredictedAmount());
        forecastEntity.setType(forecast.getType());
        return forecastMapper.toDto(forecastRepository.save(forecastEntity));
    }

    public void deleteForecast(UUID id) {
        forecastRepository.deleteById(id);
    }
}
