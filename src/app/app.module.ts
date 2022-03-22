import { ConfigModule, ConfigService } from 'nestjs-xion/config';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppBaseController } from '#app/app.base.controller';
import Config from '#configs';
import { AccountModule } from '#modules/account/account.module';
import { AuthModule } from '#modules/auth/auth.module';
import { TodoModule } from '#modules/todo/todo.module';

import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) =>
        config.get(Config.Database) as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    AccountModule,
    AuthModule,
    TodoModule,
  ],
  controllers: [AppBaseController],
})
export class AppModule {}
