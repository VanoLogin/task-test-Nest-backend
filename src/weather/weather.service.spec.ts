import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import { Repository } from 'typeorm';
import { WeatherEntity } from '../db/models/weather.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('WeatherService', () => {
  let service: WeatherService;
  let repository: Repository<WeatherEntity>;

  beforeEach(async () => {
    const mockRepository = {
      createQueryBuilder: jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getOne: jest.fn(),
      })),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        {
          provide: getRepositoryToken(WeatherEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
    repository = module.get<Repository<WeatherEntity>>(
      getRepositoryToken(WeatherEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});
