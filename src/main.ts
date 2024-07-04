import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import cookieParser from 'cookie-parser';
import { JwtPrGuard } from './jwt_pr/jwt_pr.guard';
import { HttpPrFilter } from './http_pr/http_pr.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(cookieParser());
  app.useGlobalGuards(new JwtPrGuard());
  app.useGlobalFilters(new HttpPrFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
