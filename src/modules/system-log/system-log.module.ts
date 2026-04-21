import { SystemLog } from '#entities/system-log.entity';
import { SystemLogService } from '#modules/system-log/system-log.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SystemLog])],
  providers: [SystemLogService],
  exports: [SystemLogService],
})
export class SystemLogModule {}
