import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Todo } from '#entities/todo.entity';

@Injectable()
export class TodoService extends TypeOrmCrudService<Todo> {
  constructor(@InjectRepository(Todo) protected repo: Repository<Todo>) {
    super(repo);
  }
}
