import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CrudRequest, ParsedRequest } from '@nestjsx/crud';

import { UUIDParamDto } from '#models/dtos/uuid-param.dto';
import {
  SafeCrudRequestInterceptor,
  StandardResponseInterceptor,
} from '#utils/interceptor';
import { Standardized } from '#utils/standard-response';

import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { GetTodosResponse } from './responses/get-todos.response';
import { TodoService } from './todo.service';

@ApiTags('Todo')
@Controller('v1/todos')
@UseInterceptors(SafeCrudRequestInterceptor, StandardResponseInterceptor)
export class TodoController {
  constructor(private readonly service: TodoService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiCreatedResponse({ type: Standardized() })
  async create(@Body() { message }: CreateTodoDto): Promise<void> {
    await this.service.create(message);
  }

  @Get()
  @ApiOperation({ summary: 'Get todos' })
  @ApiOkResponse({ type: GetTodosResponse })
  async get(@ParsedRequest() req: CrudRequest): Promise<GetTodosResponse> {
    return this.service.get(req);
  }

  @Get()
  @ApiOperation({ summary: 'Get a todo' })
  @ApiOkResponse({ type: GetTodosResponse })
  async getOne(@ParsedRequest() req: CrudRequest): Promise<GetTodosResponse> {
    return this.service.get(req);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update an existing todo' })
  @ApiOkResponse({ type: Standardized() })
  async update(
    @Param() { uuid }: UUIDParamDto,
    @Body() dto: UpdateTodoDto,
  ): Promise<void> {
    await this.service.update(uuid, dto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete an existing todo' })
  @ApiOkResponse({ type: Standardized() })
  async delete(@Param() { uuid }: UUIDParamDto): Promise<void> {
    await this.service.delete(uuid);
  }
}
