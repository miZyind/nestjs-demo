import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppController } from '#app/app.controller';
import Config, { load } from '#configs';
import { LoggerModule } from '#logger/logger.module';
import { ModulesV1 } from '#v1';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: load() }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) =>
        config.get(Config.Database) as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    LoggerModule,
    ModulesV1,
  ],
  controllers: [AppController],
})
export class AppModule {}
