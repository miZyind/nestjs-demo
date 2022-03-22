import { ApiProperty } from '@nestjs/swagger';

import { TodoStatus } from '#entities/todo.entity';

export class TodoResponse {
  @ApiProperty()
  readonly createdAt!: Date;

  @ApiProperty()
  readonly updatedAt?: Date;

  @ApiProperty({ format: 'uuid' })
  readonly uuid!: string;

  @ApiProperty({ example: TodoStatus.Done })
  readonly status!: TodoStatus;

  @ApiProperty({ example: 'Remember to buy 3 eggs before tonight' })
  readonly message!: string;
}
