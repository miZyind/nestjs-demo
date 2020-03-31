import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CrudRequest,
  GetManyDefaultResponse,
  ParsedRequest,
} from '@nestjsx/crud';

import { Todo } from '../../../entities/todo.entity';
import { UUIDParamDto } from '../../../models/dtos/uuid-param.dto';
import { ApiCrudQueries, UseCrudInterceptors } from '../../../utils/decorator';
import { getManyResponseFor } from '../../../utils/response';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { ReadTodosResponse } from './responses/read-todos.response';
import { TodoError } from './todo.constant';
import { TodoService } from './todo.service';

@ApiTags('Todo')
@Controller('/v1/todos')
export class TodoController {
  constructor(private readonly service: TodoService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiCreatedResponse({
    description:
      'Response status code only if new todo is created successfully',
  })
  async create(@Body() { message }: CreateTodoDto): Promise<void> {
    await this.service.create(message);
  }

  @Get()
  @UseCrudInterceptors()
  @ApiOperation({ summary: 'Retrieve all todos' })
  @ApiCrudQueries()
  @ApiOkResponse({ type: getManyResponseFor(ReadTodosResponse) })
  async read(
    @ParsedRequest() request: CrudRequest,
  ): Promise<GetManyDefaultResponse<Todo>> {
    return this.service.read(request);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update a existing todo' })
  @ApiOkResponse({
    description:
      'Response status code only if the todo is updated successfully',
  })
  @ApiBadRequestResponse({
    content: {
      'application/json': {
        example: {
          statusCode: 400,
          message: TodoError.TodoNotFound,
          error: 'Bad Request',
        },
      },
    },
  })
  async update(
    @Param() { uuid }: UUIDParamDto,
    @Body() dto: UpdateTodoDto,
  ): Promise<void> {
    await this.service.update(uuid, dto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a existing todo' })
  @ApiOkResponse({
    description:
      'Response status code only if the todo is deleted successfully',
  })
  @ApiBadRequestResponse({
    content: {
      'application/json': {
        example: {
          statusCode: 400,
          message: TodoError.TodoNotFound,
          error: 'Bad Request',
        },
      },
    },
  })
  async delete(@Param() { uuid }: UUIDParamDto): Promise<void> {
    await this.service.delete(uuid);
  }
}
