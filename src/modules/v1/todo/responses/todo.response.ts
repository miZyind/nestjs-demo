import { ApiProperty } from '@nestjs/swagger';

import { TodoStatus } from '#entities/todo.entity';

export class TodoResponse {
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
