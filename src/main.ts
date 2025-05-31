import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import cookieParesr from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:4173',
      'https://thechatter-423dc45d8040.herokuapp.com',
    ],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));
  app.use(cookieParesr());
  const configService = app.get(ConfigService);
  await app.listen(configService.getOrThrow('PORT'));
}
void bootstrap();
