import { ConfigModule, ConfigService } from 'nestjs-xion/config';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppBaseController } from '#app/app.base.controller';
import Config from '#configs';
import { AuthModule } from '#modules/auth/auth.module';
import { SystemLogModule } from '#modules/system-log/system-log.module';
import { TermsOfServiceModule } from '#modules/terms-of-service/terms-of-service.module';
import { TodoModule } from '#modules/todo/todo.module';
import { UserModule } from '#modules/user/user.module';
import { AdminModule } from '#platforms/admin/admin.module';
import { MobileModule } from '#platforms/mobile/mobile.module';
import { WebModule } from '#platforms/web/web.module';

import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) =>
        config.get(Config.Database) as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    AuthModule,
    SystemLogModule,
    TermsOfServiceModule,
    TodoModule,
    UserModule,
    // Platform Modules
    AdminModule,
    MobileModule,
    WebModule,
  ],
  controllers: [AppBaseController],
})
export class AppModule {}
