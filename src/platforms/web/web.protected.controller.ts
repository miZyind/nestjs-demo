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
import { JWTUserPayload } from '#modules/auth/strategies/jwt.strategy';
import { TodoService } from '#modules/todo/todo.service';
import { WebCreateTodoDTO } from '#platforms/web/dtos/create-todo.dto';
import { WebUpdateTodoDTO } from '#platforms/web/dtos/update-todo.dto';
import { WebCreateTodoResponse } from '#platforms/web/responses/create-todo.response';
import { WebFormattedTodoResponse } from '#platforms/web/responses/formatted-todo.response';
import { WebGetTodoDetailsResponse } from '#platforms/web/responses/get-todo-details.response';

@ApiTags('Platform [Web]')
@JWTUserGuard()
@Controller('protected/web')
export class WebProtectedController {
  constructor(private readonly todoService: TodoService) {}

  @Post('todos')
  @ApiOperation({ summary: 'Create a new todo item' })
  @ApiStandardResponse({
    status: HttpStatus.CREATED,
    type: WebCreateTodoResponse,
  })
  async createTodo(
    @User() { uuid: userUUID }: JWTUserPayload,
    @Body() dto: WebCreateTodoDTO,
  ): ReturnType<TodoService['create']> {
    return this.todoService.create(userUUID, dto);
  }

  @Get('todos')
  @UseInterceptors(CRUDInterceptor)
  @ApiOperation({ summary: 'Get all todo items' })
  @ApiStandardListResponse({ type: WebFormattedTodoResponse })
  async getAllTodos(
    @User() { uuid: userUUID }: JWTUserPayload,
    @ParsedRequest() req: CRUDRequest,
  ): ReturnType<TodoService['getAll']> {
    return this.todoService.getAll(userUUID, req);
  }

  @Get('todos/:uuid')
  @ApiOperation({ summary: 'Get details of a todo item' })
  @ApiStandardResponse({ type: WebGetTodoDetailsResponse })
  async getTodoDetails(
    @User() { uuid: userUUID }: JWTUserPayload,
    @Param() { uuid }: UUIDParamDTO,
  ): ReturnType<TodoService['getDetails']> {
    return this.todoService.getDetails(userUUID, uuid);
  }

  @Patch('todos/:uuid')
  @ApiOperation({ summary: 'Update an existing todo item' })
  @ApiStandardResponse()
  async updateTodo(
    @User() { uuid: userUUID }: JWTUserPayload,
    @Param() { uuid }: UUIDParamDTO,
    @Body() dto: WebUpdateTodoDTO,
  ): Promise<void> {
    return this.todoService.update(userUUID, uuid, dto);
  }

  @Delete('todos/:uuid')
  @ApiOperation({ summary: 'Delete an existing todo item' })
  @ApiStandardResponse()
  async deleteTodo(
    @User() { uuid: userUUID }: JWTUserPayload,
    @Param() { uuid }: UUIDParamDTO,
  ): Promise<void> {
    return this.todoService.delete(userUUID, uuid);
  }
}
