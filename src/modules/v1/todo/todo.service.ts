import { Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Todo } from '../../../entities/todo.entity';
import { TodoError } from './todo.constant';

@Injectable()
export class TodoService extends TypeOrmCrudService<Todo> {
  constructor(@InjectRepository(Todo) protected repo: Repository<Todo>) {
    super(repo);
  }

  async create(message: string): Promise<void> {
    await this.repo.save(this.repo.create({ message }));
  }

  async read(request: CrudRequest): Promise<GetManyDefaultResponse<Todo>> {
    request.options.query = {
      ...request.options.query,
      // Explicitly allow return fields
      allow: ['uuid', 'message', 'status', 'createdAt', 'updatedAt'],
    };

    const response = (await this.getMany(request)) as GetManyDefaultResponse<
      Todo
    >;

    return response;
  }

  async update(uuid: string, partialEntity: Partial<Todo>): Promise<void> {
    await this.findOneOrFail(uuid);
    await this.repo.update(uuid, partialEntity);
  }

  async delete(uuid: string): Promise<void> {
    await this.findOneOrFail(uuid);
    await this.repo.delete(uuid);
  }

  private async findOneOrFail(uuid: string): Promise<Todo> {
    try {
      const todo = await this.repo.findOneOrFail(uuid);

      return todo;
    } catch (error) {
      throw new BadRequestException(TodoError.TodoNotFound);
    }
  }
}
