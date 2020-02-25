import { ConfigModule, ConfigService } from 'nestjs-config';
import { resolve } from 'path';
import { Connection } from 'typeorm';

import { Module, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Config } from './config';
import { InfoModule } from './modules/info/info.module';
import { ModulesV1 } from './modules/v1';
import { ModulesV2 } from './modules/v2';

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config/*.{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    InfoModule,
    ModulesV1,
    ModulesV2,
  ],
})
class AppModule {
  constructor(public readonly connection: Connection) {}
}

async function main(): Promise<void> {
  // Setup app
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const { name, host, port, basePath } = config.get(Config.App);
  // Setup app global settings
  app.setGlobalPrefix(basePath);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  // Setup Swagger
  if (config.get(Config.Swagger).enable) {
    const { Swagger } = await import('./swagger');
    Swagger(app, name, basePath);
  }
  // Launch app
  await app.listen(port, host);
}

main();
