import { Repository } from 'typeorm';

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Account, AccountRole, AccountStatus } from '#entities/account.entity';

import { AccountError } from './account.constant';
import { CreateDTO } from './dtos/create.dto';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);

  constructor(@InjectRepository(Account) protected repo: Repository<Account>) {}

  async create({ email, password }: CreateDTO): Promise<void> {
    if (await this.repo.count({ email })) {
      throw new BadRequestException(AccountError.ThisEmailAlreadyExists);
    }

    const entity = this.repo.create({
      role: AccountRole.User,
      email,
      password,
    });

    await this.repo.save(entity);

    this.logger.debug(`Account [${email}] registered`);
  }

  async approve(uuid: string): Promise<void> {
    await this.repo.update(uuid, { status: AccountStatus.Approved });
  }

  async reject(uuid: string): Promise<void> {
    await this.repo.update(uuid, { status: AccountStatus.Banned });
  }

  async findByEmail(email: string): Promise<Account | undefined> {
    return this.repo.findOne({ email });
  }
}
