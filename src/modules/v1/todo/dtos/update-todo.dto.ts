import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { TodoStatus } from '../../../../entities/todo.entity';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Remember to buy 4 eggs before tonight' })
  message!: string;

  @IsOptional()
  @IsEnum(TodoStatus)
  @IsNotEmpty()
  @ApiProperty({ example: TodoStatus.Done })
  status!: TodoStatus;
}
