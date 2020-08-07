import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { TodoStatus } from '#entities/todo.entity';

export class UpdateTodoDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Remember to buy 4 eggs before tonight' })
  message!: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(TodoStatus)
  @ApiProperty({ example: TodoStatus.Done })
  status!: TodoStatus;
}
