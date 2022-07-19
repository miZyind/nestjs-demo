import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { TodoStatus } from '#entities/todo.entity';

export class WebUpdateTodoDTO {
  @IsOptional()
  @IsEnum(TodoStatus)
  @ApiPropertyOptional({ example: TodoStatus.Done })
  readonly status?: TodoStatus;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional({ example: 'Remember to buy 4 eggs before tonight' })
  readonly message?: string;
}
