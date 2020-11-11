import { Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Account, AccountRole } from '#entities/account.entity';

import { AccountError } from './account.constant';

@Injectable()
export class AccountService {
  constructor(@InjectRepository(Account) protected repo: Repository<Account>) {}

  async register(email: string, password: string): Promise<void> {
    if (await this.repo.count({ email })) {
      throw new BadRequestException(AccountError.ThisEmailAlreadyExists);
    }

    const entity = this.repo.create({
      role: AccountRole.User,
      email,
      password,
    });

    await this.repo.save(entity);
  }

  async findByEmail(email: string): Promise<Account | undefined> {
    return this.repo.findOne({ email });
  }
}
