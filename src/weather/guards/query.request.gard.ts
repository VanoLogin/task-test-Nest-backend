import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class WeatherParamsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { lat, lon, part } = request.query;

    if (isNaN(Number(lat)) || isNaN(Number(lon))) {
      throw new HttpException(
        'Invalid latitude or longitude. They must be numeric values.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (part && !isNaN(Number(part))) {
      throw new HttpException(
        'Invalid "part" parameter. It must be a string.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }
}
