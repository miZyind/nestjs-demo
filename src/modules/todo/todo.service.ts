import { CRUDService } from 'nestjs-xion/crud';
import { Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Todo } from '#entities/todo.entity';
import { TodoError } from '#modules/todo/todo.constant';

import type { CRUDRequest } from 'nestjs-xion/crud';
import type { StandardList } from 'nestjs-xion/model';
import type {
  CreateTodoDTO,
  CreateTodoResponse,
  UpdateTodoDTO,
} from '#modules/todo/todo.interface';

@Injectable()
export class TodoService extends CRUDService<Todo> {
  constructor(
    @InjectRepository(Todo) protected readonly repo: Repository<Todo>,
  ) {
    super(repo);
  }

  async getDetails(userUUID: string, uuid: string): Promise<Todo> {
    const entity = await this.repo.findOneBy({
      user: { uuid: userUUID },
      uuid,
    });

    if (entity) {
      return entity;
    }

    throw new BadRequestException(TodoError.TodoNotFound);
  }

  async getAll(
    userUUID: string,
    req: CRUDRequest,
  ): Promise<StandardList<Todo>> {
    req.search.$and = [{ userUUID }];

    return this.getMany(req, { allow: ['uuid', 'status', 'message'] });
  }

  async create(
    userUUID: string,
    { message }: CreateTodoDTO,
  ): Promise<CreateTodoResponse> {
    const todo = await this.repo.save(
      this.repo.create({ message, user: { uuid: userUUID } }),
    );

    return { uuid: todo.uuid };
  }

  async update(
    userUUID: string,
    uuid: string,
    dto: UpdateTodoDTO,
  ): Promise<void> {
    await this.repo.update({ uuid, user: { uuid: userUUID } }, dto);
  }

  async delete(userUUID: string, uuid: string): Promise<void> {
    await this.repo.delete({ uuid, user: { uuid: userUUID } });
  }
}
