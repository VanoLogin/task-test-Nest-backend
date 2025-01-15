import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          sunrise: data?.part?.sys?.sunrise,
          sunset: data?.part?.sys?.sunset,
          temp: data?.part?.main?.temp,
          feels_like: data?.part?.main?.feels_like,
          pressure: data?.part?.main?.pressure,
          humidity: data?.part?.main?.humidity,
          uvi: data?.part?.uvi || 0,
          wind_speed: data?.part?.wind?.speed,
        };
      }),
    );
  }
}
