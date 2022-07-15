import { CRUDService } from 'nestjs-xion/crud';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Todo } from '#entities/todo.entity';

@Injectable()
export class TodoService extends CRUDService<Todo> {
  constructor(
    @InjectRepository(Todo) protected readonly repo: Repository<Todo>,
  ) {
    super(repo);
  }
}
