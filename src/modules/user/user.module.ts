import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '#entities/user.entity';
import { SystemLogModule } from '#modules/system-log/system-log.module';
import { UserSchedule } from '#modules/user/user.schedule';
import { UserService } from '#modules/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SystemLogModule],
  providers: [UserSchedule, UserService],
  exports: [UserService],
})
export class UserModule {}
