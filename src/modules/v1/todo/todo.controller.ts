import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { Todo } from '../../../entities/todo';
import { TodoService } from './todo.service';

@Controller('/v1/todos')
export class TodoController {
  constructor(public readonly service: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all todos' })
  public read(): Promise<Todo[]> {
    return this.service.find({ order: { createdAt: 'ASC' } });
  }
}
