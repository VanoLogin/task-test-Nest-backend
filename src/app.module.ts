import { Module } from '@nestjs/common';
import { DataBaseModule } from './database.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [DataBaseModule, WeatherModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
