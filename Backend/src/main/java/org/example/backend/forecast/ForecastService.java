package org.example.backend.forecast;

import lombok.AllArgsConstructor;
import org.example.backend.mapper.ForecastMapper;
import org.example.backend.user.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.example.model.Forecast;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ForecastService {

    private final ForecastRepository forecastRepository;
    private final ForecastMapper forecastMapper;
    private final UserRepository userRepository;

    public List<Forecast> getForecasts()  {
        return forecastMapper.toDto(forecastRepository.findAll());
    }

    public Forecast getForecast(UUID id) {
        return forecastMapper.toDto(forecastRepository.findById(id).orElseThrow());
    }

    public Forecast createForecast(Forecast forecast) {
        ForecastEntity forecastEntity = forecastMapper.toEntity(forecast);
        forecastEntity.setUser(userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(
                        () -> new RuntimeException("User not found")
                ));

        forecastRepository.save(forecastEntity);
        return forecastMapper.toDto(forecastEntity);
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
