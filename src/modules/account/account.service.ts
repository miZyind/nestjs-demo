import { Repository } from 'typeorm';

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Account, AccountStatus, Role } from '#entities/account.entity';
import { AccountError } from '#modules/account/account.constant';

import type { StandardList } from 'nestjs-xion/model';
import type { CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud';
import type { CreateAccountDTO } from '#modules/account/dtos/create-account.dto';

@Injectable()
export class AccountService extends TypeOrmCrudService<Account> {
  private readonly logger = new Logger(AccountService.name);

  constructor(@InjectRepository(Account) protected repo: Repository<Account>) {
    super(repo);
  }

  async getAll(req: CrudRequest): Promise<StandardList<Account>> {
    req.options.query = {
      allow: ['createdAt', 'updatedAt', 'uuid', 'status', 'role', 'email'],
      join: {
        todos: {
          allow: ['createdAt', 'updatedAt', 'uuid', 'status', 'message'],
          eager: true,
        },
      },
      sort: [{ field: 'updatedAt', order: 'DESC' }],
    };

    const { data, total } = (await this.getMany(
      req,
    )) as GetManyDefaultResponse<Account>;

    return { data, total };
  }

  async createAdmin({ email, password }: CreateAccountDTO): Promise<void> {
    await this.create(Role.Admin, email, password);
    this.logger.debug(`Admin account [${email}] created`);
  }

  async register({ email, password }: CreateAccountDTO): Promise<void> {
    await this.create(Role.User, email, password);
    this.logger.debug(`Account [${email}] registered`);
  }

  async approve(uuid: string): Promise<void> {
    await this.repo.update(uuid, { status: AccountStatus.Approved });
  }

  async reject(uuid: string): Promise<void> {
    await this.repo.update(uuid, { status: AccountStatus.Banned });
  }

  validateStatus(status: AccountStatus): void {
    switch (status) {
      case AccountStatus.ApprovePending:
        throw new BadRequestException(
          AccountError.ThisAccountHasNotBeenApproved,
        );
      case AccountStatus.Approved:
        break;
      case AccountStatus.Banned:
        throw new BadRequestException(AccountError.ThisAccountHasBeenBanned);
      default:
        throw new BadRequestException(AccountError.InvalidAccountStatus);
    }
  }

  private async create(
    role: Role,
    email: string,
    password: string,
  ): Promise<void> {
    if (await this.repo.count({ email })) {
      throw new BadRequestException(AccountError.ThisEmailAlreadyExists);
    }

    await this.repo.save(
      this.repo.create({
        status:
          role === Role.Admin
            ? AccountStatus.Approved
            : AccountStatus.ApprovePending,
        role,
        email,
        password,
      }),
    );
  }
}
