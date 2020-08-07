import { Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Todo } from '#entities/todo.entity';
import { Logger } from '#logger/logger.service';
import { hasValue } from '#utils/type-guard';

import { GetTodosResponse } from './responses/get-todos.response';
import { TodoError } from './todo.error';

@Injectable()
export class TodoService extends TypeOrmCrudService<Todo> {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Todo) protected repo: Repository<Todo>,
  ) {
    super(repo);
    this.logger.setContext(this.constructor.name);
  }

  async create(message: string): Promise<void> {
    await this.repo.save(this.repo.create({ message }));
  }

  async get(req: CrudRequest): Promise<GetTodosResponse> {
    req.options.query = {
      ...req.options.query,
      // Explicitly allow return fields
      allow: ['uuid', 'message', 'status', 'createdAt', 'updatedAt'],
    };

    return (await this.getMany(req)) as GetTodosResponse;
  }

  async update(uuid: string, partialEntity: Partial<Todo>): Promise<void> {
    await this.findOneOrError(uuid);
    await this.repo.update(uuid, partialEntity);
  }

  async delete(uuid: string): Promise<void> {
    await this.findOneOrError(uuid);
    await this.repo.delete(uuid);
  }

  private async findOneOrError(uuid: string): Promise<Todo> {
    const todo = await this.repo.findOne(uuid);

    if (!hasValue(todo)) {
      throw new BadRequestException(TodoError.TodoNotFound);
    }

    return todo;
  }
}
