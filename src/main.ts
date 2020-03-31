/**
 * Disabled the rule due to: https://github.com/typescript-eslint/typescript-eslint/issues/1717
 */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ConfigModule, ConfigService } from 'nestjs-config';
import { resolve } from 'path';

import { Module, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Config } from './config';
import { InfoModule } from './modules/info/info.module';
import { RMQModule } from './modules/rmq/rmq.module';
import { ModulesV1 } from './modules/v1';
import { ModulesV2 } from './modules/v2';

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config/*.{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) =>
        config.get(Config.Database) as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    InfoModule,
    RMQModule,
    ModulesV1,
    ModulesV2,
  ],
})
class AppModule {}

async function main(): Promise<void> {
  // Setup app
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  // Load config
  const { name, host, port, basePath } = config.get(Config.App);
  const { enable: isSwaggerEnabled } = config.get(Config.Swagger);
  const { enable: isRMQEnabled, options: rmqOptions } = config.get(Config.RMQ);
  // Setup app global settings
  app.setGlobalPrefix(basePath);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  // Setup Swagger
  if (isSwaggerEnabled === true) {
    const { setupSwagger } = await import('./utils/swagger');
    setupSwagger(app, name, basePath);
  }
  // Setup RabbitMQ
  if (isRMQEnabled === true) {
    const { setupRMQ } = await import('./utils/rmq');
    setupRMQ(app, rmqOptions);
  }
  // Launch app
  await app.startAllMicroservicesAsync();
  await app.listen(port, host);
}

main().catch((error) => {
  throw error;
});
