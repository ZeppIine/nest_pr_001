import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { HttpPrFilter } from './http_pr/http_pr.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SslMiddlePrMiddleware } from './ssl_middle_pr/ssl_middle_pr.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  process.env.NODE_ENV == 'production'
    ? app.use(new SslMiddlePrMiddleware().use)
    : undefined;
  app.use(cookieParser());
  app.useGlobalFilters(new HttpPrFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const config = new DocumentBuilder().setTitle('Nest 연습').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
