import { CRUDInterceptor, CRUDRequest, ParsedRequest } from 'nestjs-xion/crud';
import {
  ApiStandardListResponse,
  ApiStandardResponse,
  User,
} from 'nestjs-xion/decorator';
import { UUIDParamDTO } from 'nestjs-xion/dto';

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { JWTUserGuard } from '#modules/auth/guards/jwt-user.guard';
import { UserPayload } from '#modules/auth/strategies/jwt.strategy';
import { CreateTodoDTO } from '#modules/todo/dtos/create-todo.dto';
import { UpdateTodoDTO } from '#modules/todo/dtos/update-todo.dto';
import { CreateTodoResponse } from '#modules/todo/responses/create-todo.response';
import { GetTodoDetailsResponse } from '#modules/todo/responses/get-todo-details.response';
import { TodoService } from '#modules/todo/todo.service';

@ApiTags('Todo')
@JWTUserGuard()
@Controller('protected/todos')
export class TodoProtectedController {
  constructor(readonly service: TodoService) {}

  @Get(':uuid')
  @ApiOperation({ summary: 'Get details of a todo item' })
  @ApiStandardResponse({ type: GetTodoDetailsResponse })
  async getDetails(
    @User() { uuid: userUUID }: UserPayload,
    @Param() { uuid }: UUIDParamDTO,
  ): ReturnType<TodoService['getDetails']> {
    return this.service.getDetails(userUUID, uuid);
  }

  @Get()
  @UseInterceptors(CRUDInterceptor)
  @ApiOperation({ summary: 'Get all todo items' })
  @ApiStandardListResponse({ type: GetTodoDetailsResponse })
  async getAll(
    @User() { uuid: userUUID }: UserPayload,
    @ParsedRequest() req: CRUDRequest,
  ): ReturnType<TodoService['getAll']> {
    return this.service.getAll(userUUID, req);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new todo item' })
  @ApiStandardResponse({ status: HttpStatus.CREATED, type: CreateTodoResponse })
  async create(
    @User() { uuid: userUUID }: UserPayload,
    @Body() dto: CreateTodoDTO,
  ): ReturnType<TodoService['create']> {
    return this.service.create(userUUID, dto);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update an existing todo item' })
  @ApiStandardResponse()
  async update(
    @User() { uuid: userUUID }: UserPayload,
    @Param() { uuid }: UUIDParamDTO,
    @Body() dto: UpdateTodoDTO,
  ): Promise<void> {
    return this.service.update(userUUID, uuid, dto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete an existing todo item' })
  @ApiStandardResponse()
  async delete(
    @User() { uuid: userUUID }: UserPayload,
    @Param() { uuid }: UUIDParamDTO,
  ): Promise<void> {
    return this.service.delete(userUUID, uuid);
  }
}
