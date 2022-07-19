import { ApiProperty } from '@nestjs/swagger';

import { TodoStatus } from '#entities/todo.entity';
import { Role, UserStatus } from '#entities/user.entity';

export class AdminFormattedUserTodo {
  @ApiProperty()
  readonly createdAt!: Date;

  @ApiProperty()
  readonly updatedAt!: Date;

  @ApiProperty({ format: 'uuid' })
  readonly uuid!: string;

  @ApiProperty()
  readonly status!: TodoStatus;

  @ApiProperty()
  readonly message!: string;
}

export class AdminFormattedUser {
  @ApiProperty()
  readonly createdAt!: Date;

  @ApiProperty()
  readonly updatedAt!: Date;

  @ApiProperty({ format: 'uuid' })
  readonly uuid!: string;

  @ApiProperty()
  readonly status!: UserStatus;

  @ApiProperty()
  readonly role!: Role;

  @ApiProperty({ format: 'email' })
  readonly email!: string;

  @ApiProperty()
  readonly todos!: AdminFormattedUserTodo[];
}
