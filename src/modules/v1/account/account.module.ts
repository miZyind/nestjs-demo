import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from '#entities/account.entity';

import { AccountService } from './account.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
