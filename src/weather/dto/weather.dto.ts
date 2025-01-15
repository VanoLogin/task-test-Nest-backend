import { IsNumber, IsOptional } from 'class-validator';

export class CreateWeatherDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lon: number;

  @IsOptional()
  part: Record<string, any>;
}
