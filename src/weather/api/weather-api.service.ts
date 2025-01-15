import { HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { WeatherQueryParams } from '../interfaces/weather.type';
import 'dotenv/config';
export async function fetchWeatherData(params: WeatherQueryParams) {
  const { lat, lon, part } = params;
  const apiKey = process.env.WEATHER_API_KEY;
  const url = part
    ? `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}`
    : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  try {
    console.log('we are there');
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw new HttpException(
      `Failed to fetch weather data: ${error.response?.data?.message || error.message}`,
      error.response?.status || HttpStatus.BAD_REQUEST,
    );
  }
}
