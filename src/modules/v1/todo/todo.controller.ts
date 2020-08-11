import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';

import { AuthStrategy } from '#app/app.constant';
import { Account } from '#entities/account.entity';
import { Todo } from '#entities/todo.entity';
import { StandardResponse } from '#models/responses/standard.response';
import {
  SafeCrudRequestInterceptor,
  StandardResponseInterceptor,
} from '#utils/interceptor';

import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { TodoResponse } from './responses/todo.response';
import { TodosResponse } from './responses/todos.response';
import { TodoService } from './todo.service';

@ApiTags('Todo')
@ApiSecurity(AuthStrategy.JWT)
@UseGuards(AuthGuard(AuthStrategy.JWT))
@Crud({
  model: { type: Todo },
  dto: { create: CreateTodoDto, update: UpdateTodoDto },
  query: {
    join: { account: { eager: true, select: false, required: true } },
    alwaysPaginate: true,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
    getOneBase: {
      decorators: [
        ApiOperation({ summary: 'Read one todo' }),
        ApiOkResponse({ type: TodoResponse }),
      ],
    },
    getManyBase: {
      decorators: [
        ApiOperation({ summary: 'Read many todos' }),
        ApiOkResponse({ type: TodosResponse }),
      ],
    },
    createOneBase: {
      decorators: [
        ApiOperation({ summary: 'Create a new todo' }),
        ApiCreatedResponse({ type: TodoResponse }),
      ],
    },
    updateOneBase: {
      decorators: [
        ApiOperation({ summary: 'Update an existing todo' }),
        ApiOkResponse({ type: TodoResponse }),
      ],
    },
    deleteOneBase: {
      decorators: [
        ApiOperation({ summary: 'Delete an existing todo' }),
        ApiOkResponse({ type: StandardResponse }),
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
@Controller('v1/todos')
@UseInterceptors(SafeCrudRequestInterceptor, StandardResponseInterceptor)
export class TodoController implements CrudController<Todo> {
  constructor(readonly service: TodoService) {}
}
