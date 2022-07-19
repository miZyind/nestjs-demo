import { CRUDService } from 'nestjs-xion/crud';
import { Repository } from 'typeorm';

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { SystemLog } from '#entities/system-log.entity';

import type { CreateSystemLogDTO } from '#modules/system-log/system-log.interface';

@Injectable()
export class SystemLogService extends CRUDService<SystemLog> {
  private readonly logger = new Logger(SystemLogService.name);

  constructor(
    @InjectRepository(SystemLog)
    protected readonly repo: Repository<SystemLog>,
  ) {
    super(repo);
  }

  log(dto: CreateSystemLogDTO): void {
    void this.repo
      .save(this.repo.create(dto))
      .catch((error) => this.logger.error(error));
  }
}
