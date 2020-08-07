import { ApiProperty } from '@nestjs/swagger';
import { GetManyDefaultResponse } from '@nestjsx/crud';

import { TodoStatus } from '#entities/todo.entity';
import { StandardizedList } from '#utils/standard-response';

export class GetTodos {
  @ApiProperty({ format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ format: 'date-time' })
  updatedAt?: Date;

  @ApiProperty({ format: 'uuid' })
  uuid!: string;

  @ApiProperty({ example: 'Remember to buy 3 eggs before tonight' })
  message!: string;

  @ApiProperty({ example: TodoStatus.Done })
  status!: TodoStatus;
}

export type GetTodosResponse = GetManyDefaultResponse<GetTodos>;

export const GetTodosResponse = StandardizedList(GetTodos);
