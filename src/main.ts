import { ConfigService } from 'nestjs-xion/config';
import { ErrorFilter } from 'nestjs-xion/error';
import { StandardResponseInterceptor } from 'nestjs-xion/interceptor';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { BaseAppModule } from '#app/app.module';
import Config from '#configs';

import type { AppConfig, RMQConfig } from '#configs';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(BaseAppModule);
  const config = app.get(ConfigService);
  const appConf = config.get(Config.App) as AppConfig;
  const rmqConf = config.get(Config.RMQ) as RMQConfig;

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalInterceptors(new StandardResponseInterceptor());

  if (rmqConf.enable) {
    (await import('./utils/rmq')).setup(app, rmqConf.options);
  }
  if (appConf.swagger) {
    (await import('./utils/swagger')).setup(app, appConf);
  }

  await app.startAllMicroservices();
  await app.listen(appConf.port, appConf.host);
}

bootstrap().catch((error) => {
  throw error;
});
