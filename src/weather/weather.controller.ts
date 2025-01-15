import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/weather.dto';
import { WeatherQueryParams } from './interfaces/weather.type';
import { ResponseInterceptor } from './interceptors/response.post.interceptor';
import { TransformResponseInterceptor } from './interceptors/response.get.interceptor';
import { WeatherParamsGuard } from './guards/query.request.gard';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @UseInterceptors(ResponseInterceptor)
  @Post()
  async createWeatherInDb(@Body() createWeatherDto: CreateWeatherDto) {
    await this.weatherService.create(createWeatherDto);
  }

  @UseInterceptors(TransformResponseInterceptor)
  @UseGuards(WeatherParamsGuard)
  @Get()
  async getWeatherFromDb(@Query() query: WeatherQueryParams) {
    return await this.weatherService.findByParams(query);
  }
}
