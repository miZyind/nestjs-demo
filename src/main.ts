import { StandardResponseInterceptor } from 'nestjs-xion/interceptor';

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '#app/app.module';
import Config from '#configs';
import { BaseExceptionFilter } from '#utils/base-exception.filter';

import type { AppConfig, RMQConfig, SwaggerConfig } from '#configs';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // Load configs
  const appConf = config.get(Config.App) as AppConfig;
  const rmqConf = config.get(Config.RMQ) as RMQConfig;
  const swaggerConf = config.get(Config.Swagger) as SwaggerConfig;

  // Setup app global settings
  app.setGlobalPrefix(appConf.basePath);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new BaseExceptionFilter());
  app.useGlobalInterceptors(new StandardResponseInterceptor());

  if (rmqConf.enable) {
    (await import('./services/rmq')).setup(app, rmqConf.options);
  }

  if (swaggerConf.enable) {
    (await import('./services/swagger')).setup(app, appConf);
  }

  await app.startAllMicroservicesAsync();
  await app.listen(appConf.port, appConf.host);
}

bootstrap().catch((error) => {
  throw error;
});
