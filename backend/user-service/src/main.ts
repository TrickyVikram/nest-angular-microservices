import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  await app.listen(
    configService.get<number>('USER_SERVICE_PORT') || 3001,
  );

  console.log(
    `User Service Running On Port ${
      configService.get<number>('USER_SERVICE_PORT') || 3001
    }`,
  );
}
bootstrap();