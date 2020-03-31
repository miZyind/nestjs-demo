import { ApiProperty } from '@nestjs/swagger';

import { TodoStatus } from '../../../../entities/todo.entity';

export class ReadTodosResponse {
  @ApiProperty({ format: 'date-time' })
  createdAt?: string;

  @ApiProperty({ format: 'date-time' })
  updatedAt?: string;

  @ApiProperty({ format: 'uuid' })
  uuid!: string;

  @ApiProperty({ example: 'Remember to buy 3 eggs before tonight' })
  message!: string;

  @ApiProperty({ example: TodoStatus.Done })
  status!: TodoStatus;
}
