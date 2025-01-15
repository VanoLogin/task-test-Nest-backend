import { DataSource } from 'typeorm';
import { WeatherEntity } from './db/models/weather.entity';
import 'dotenv/config';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [WeatherEntity],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
  logging: false,
});

export default AppDataSource; // Обязательно!
