import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from '#entities/account.entity';
import { AccountProtectedController } from '#modules/account/account.protected.controller';
import { AccountPublicController } from '#modules/account/account.public.controller';
import { AccountService } from '#modules/account/account.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountService],
  controllers: [AccountProtectedController, AccountPublicController],
  exports: [AccountService],
})
export class AccountModule {}
