import { CRUDService } from 'nestjs-xion/crud';
import { Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Todo } from '#entities/todo.entity';
import { TodoError } from '#modules/todo/todo.constant';

import type { CRUDRequest } from 'nestjs-xion/crud';
import type { StandardList } from 'nestjs-xion/model';
import type { CreateTodoDTO } from '#modules/todo/dtos/create-todo.dto';
import type { UpdateTodoDTO } from '#modules/todo/dtos/update-todo.dto';
import type { CreateTodoResponse } from '#modules/todo/responses/create-todo.response';

@Injectable()
export class TodoService extends CRUDService<Todo> {
  constructor(
    @InjectRepository(Todo) protected readonly repo: Repository<Todo>,
  ) {
    super(repo);
  }

  async getDetails(userUUID: string, uuid: string): Promise<Todo> {
    const entity = await this.repo.findOneBy({
      account: { uuid: userUUID },
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
    // TODO: Optimize query & response
    req.search.$and = [{ 'account.uuid': userUUID }];

    return this.getMany(req, {
      join: { account: { allow: ['uuid'], required: true } },
    });
  }

  async create(
    userUUID: string,
    { message }: CreateTodoDTO,
  ): Promise<CreateTodoResponse> {
    const todo = await this.repo.save(
      this.repo.create({ message, account: { uuid: userUUID } }),
    );

    return { uuid: todo.uuid };
  }

  async update(
    userUUID: string,
    uuid: string,
    dto: UpdateTodoDTO,
  ): Promise<void> {
    await this.repo.update({ uuid, account: { uuid: userUUID } }, dto);
  }

  async delete(userUUID: string, uuid: string): Promise<void> {
    await this.repo.delete({ uuid, account: { uuid: userUUID } });
  }
}
