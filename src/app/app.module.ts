import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import Config, { load } from '#configs';
import { ModulesV1 } from '#v1';

import { AppController } from './app.controller';

import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: load() }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) =>
        config.get(Config.Database) as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    ModulesV1,
  ],
  controllers: [AppController],
})
export class AppModule {}
