import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeatherEntity } from '../db/models/weather.entity';
import { Repository } from 'typeorm';
import { fetchWeatherData } from './api/weather-api.service';
import { WeatherQueryParams } from './interfaces/weather.type';
import { CreateWeatherDto } from './dto/weather.dto';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(WeatherEntity)
    private readonly weatherRepository: Repository<WeatherEntity>,
  ) {}
  async create(createWeatherDto: CreateWeatherDto) {
    const { lat, lon } = createWeatherDto;
    try {
      const weather = await fetchWeatherData(createWeatherDto);

      const weatherEntity = this.weatherRepository.create({
        lat,
        lon,
        part: weather,
      });
      return this.weatherRepository.save(weatherEntity);
    } catch (error) {
      throw new HttpException(
        `Failed to create weather data: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findByParams(params: WeatherQueryParams): Promise<WeatherEntity> {
    const { lat, lon, part } = params;

    const query = this.weatherRepository
      .createQueryBuilder('weather')
      .where('weather.lat = :lat', { lat })
      .andWhere('weather.lon = :lon', { lon });

    if (part) {
      query.andWhere('weather.part::text LIKE :part', { part: `%${part}%` });
    }

    try {
      const weatherData = await query.getOne();
      if (!weatherData) {
        throw new HttpException(
          `Weather data not found for lat: ${lat}, lon: ${lon}, part: ${part || 'any'}`,
          HttpStatus.NOT_FOUND,
        );
      }

      return weatherData;
    } catch (error) {
      throw new HttpException(
        `Failed to find weather data: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
