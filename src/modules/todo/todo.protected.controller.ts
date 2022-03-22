import {
  ApiStandardListResponse,
  ApiStandardResponse,
} from 'nestjs-xion/decorator';
import { PaginationInterceptor } from 'nestjs-xion/interceptor';

import { Controller, HttpStatus, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth } from '@nestjsx/crud';

import { Todo } from '#entities/todo.entity';
import { JWTUserGuard } from '#modules/auth/guards/jwt-user.guard';
import { CreateTodoDTO } from '#modules/todo/dtos/create-todo.dto';
import { UpdateTodoDTO } from '#modules/todo/dtos/update-todo.dto';
import { TodoResponse } from '#modules/todo/responses/todo.response';
import { TodoService } from '#modules/todo/todo.service';

import type { CrudController } from '@nestjsx/crud';
import type { Account } from '#entities/account.entity';

@ApiTags('Todo')
@JWTUserGuard()
@Crud({
  model: { type: Todo },
  dto: { create: CreateTodoDTO, update: UpdateTodoDTO },
  query: {
    join: { account: { eager: true, select: false, required: true } },
    alwaysPaginate: true,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
    getOneBase: {
      decorators: [
        ApiOperation({ summary: 'Get one todo item' }),
        ApiStandardResponse({ type: TodoResponse }),
      ],
    },
    getManyBase: {
      decorators: [
        ApiOperation({ summary: 'Get all todo items' }),
        ApiStandardListResponse({ type: TodoResponse }),
      ],
    },
    createOneBase: {
      decorators: [
        ApiOperation({ summary: 'Create a new todo item' }),
        ApiStandardResponse({ status: HttpStatus.CREATED, type: TodoResponse }),
      ],
    },
    updateOneBase: {
      decorators: [
        ApiOperation({ summary: 'Update an existing todo item' }),
        ApiStandardResponse({ type: TodoResponse }),
      ],
    },
    deleteOneBase: {
      decorators: [
        ApiOperation({ summary: 'Delete an existing todo item' }),
        ApiStandardResponse(),
      ],
    },
  },
  params: { uuid: { field: 'uuid', type: 'uuid', primary: true } },
})
@CrudAuth({
  property: 'user',
  filter: ({ uuid }: Account) => ({ 'account.uuid': uuid }),
  persist: ({ uuid }: Account) => ({ account: { uuid } }),
})
@Controller('protected/todos')
@UseInterceptors(PaginationInterceptor)
export class TodoProtectedController implements CrudController<Todo> {
  constructor(readonly service: TodoService) {}
}
