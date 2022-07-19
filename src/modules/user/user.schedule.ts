import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { SystemLogType } from '#entities/system-log.entity';
import { SystemLogService } from '#modules/system-log/system-log.service';
import { UserService } from '#modules/user/user.service';
import { CronTime } from '#utils/time';

@Injectable()
export class UserSchedule {
  constructor(
    private readonly service: UserService,
    private readonly systemLogService: SystemLogService,
  ) {}

  @Cron(CronTime.Daily)
  async statisticTotalUserCountOfEachStatus(): Promise<void> {
    this.systemLogService.log({
      type: SystemLogType.UserStatistic,
      note: 'Statistic total user count of each status.',
      data: await this.service.getTotalCountOfEachStatus(),
    });
  }
}
