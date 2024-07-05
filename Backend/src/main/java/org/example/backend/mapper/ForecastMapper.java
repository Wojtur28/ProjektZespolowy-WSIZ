package org.example.backend.mapper;

import org.example.backend.forecast.ForecastEntity;
import org.mapstruct.Mapper;
import org.example.model.Forecast;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ForecastMapper {

    Forecast toDto(ForecastEntity forecastEntity);

    List<Forecast> toDto(List<ForecastEntity> forecastEntities);

    ForecastEntity toEntity(Forecast forecast);
}
