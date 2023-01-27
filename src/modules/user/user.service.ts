import { CRUDService } from 'nestjs-xion/crud';
import { Repository } from 'typeorm';

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Role, User, UserStatus } from '#entities/user.entity';
import {
  INITIAL_COUNT_OF_EACH_STATUS,
  UserError,
} from '#modules/user/user.constant';

import type { CRUDRequest } from 'nestjs-xion/crud';
import type { StandardList } from 'nestjs-xion/model';
import type { CreateUserDTO } from '#modules/user/user.interface';

@Injectable()
export class UserService extends CRUDService<User> {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectRepository(User) protected repo: Repository<User>) {
    super(repo);
  }

  async getAll(req: CRUDRequest): Promise<StandardList<User>> {
    const { data, total } = await this.getMany(req, {
      allow: ['createdAt', 'updatedAt', 'uuid', 'status', 'role', 'email'],
      join: {
        todos: {
          allow: ['createdAt', 'updatedAt', 'uuid', 'status', 'message'],
        },
      },
      sort: [{ field: 'updatedAt', order: 'DESC' }],
    });

    return { data, total };
  }

  async createAdmin({ email, password }: CreateUserDTO): Promise<void> {
    await this.create(Role.Admin, email, password);
    this.logger.debug(`Admin account [${email}] created`);
  }

  async register({ email, password }: CreateUserDTO): Promise<void> {
    await this.create(Role.User, email, password);
    this.logger.debug(`Account [${email}] registered`);
  }

  async approve(uuid: string): Promise<void> {
    await this.repo.update(uuid, { status: UserStatus.Approved });
  }

  async reject(uuid: string): Promise<void> {
    await this.repo.update(uuid, { status: UserStatus.Banned });
  }

  async getTotalCountOfEachStatus(): Promise<Record<UserStatus, number>> {
    const data = await this.repo
      .createQueryBuilder()
      .select(['status', 'COUNT(*) AS count'])
      .groupBy('status')
      .getRawMany<{ status: UserStatus; count: number }>();

    return Object.values(UserStatus).reduce(
      (results, status) => {
        results[status] =
          data.find((item) => item.status === status)?.count ??
          INITIAL_COUNT_OF_EACH_STATUS;

        return results;
      },
      {
        [UserStatus.ApprovePending]: INITIAL_COUNT_OF_EACH_STATUS,
        [UserStatus.Approved]: INITIAL_COUNT_OF_EACH_STATUS,
        [UserStatus.Banned]: INITIAL_COUNT_OF_EACH_STATUS,
      },
    );
  }

  validateStatus(status: UserStatus): void {
    switch (status) {
      case UserStatus.ApprovePending:
        throw new BadRequestException(UserError.ThisUserHasNotBeenApproved);
      case UserStatus.Approved:
        break;
      case UserStatus.Banned:
        throw new BadRequestException(UserError.ThisUserHasBeenBanned);
      default:
        throw new BadRequestException(UserError.InvalidUserStatus);
    }
  }

  private async create(
    role: Role,
    email: string,
    password: string,
  ): Promise<void> {
    if (await this.repo.countBy({ email })) {
      throw new BadRequestException(UserError.ThisEmailAlreadyExists);
    }

    await this.repo.save(
      this.repo.create({
        status:
          role === Role.Admin ? UserStatus.Approved : UserStatus.ApprovePending,
        role,
        email,
        password,
      }),
    );
  }
}
