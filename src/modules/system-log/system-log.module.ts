import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SystemLog } from '#entities/system-log.entity';
import { SystemLogService } from '#modules/system-log/system-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([SystemLog])],
  providers: [SystemLogService],
  exports: [SystemLogService],
})
export class SystemLogModule {}
