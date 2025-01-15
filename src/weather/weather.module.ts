import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherEntity } from 'src/db/models/weather.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherEntity])],
  providers: [WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}
