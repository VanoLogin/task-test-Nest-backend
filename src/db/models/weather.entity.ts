import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('weather')
export class WeatherEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  lat: number;

  @Column('float')
  lon: number;

  @Column('jsonb')
  part: Record<string, any>;
}
