import { ApiProperty } from '@nestjs/swagger';

import { AccountStatus, Role } from '#entities/account.entity';
import { TodoStatus } from '#entities/todo.entity';

export class FormattedAccountTodo {
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

export class FormattedAccount {
  @ApiProperty()
  readonly createdAt!: Date;

  @ApiProperty()
  readonly updatedAt!: Date;

  @ApiProperty({ format: 'uuid' })
  readonly uuid!: string;

  @ApiProperty()
  readonly status!: AccountStatus;

  @ApiProperty()
  readonly role!: Role;

  @ApiProperty({ format: 'email' })
  readonly email!: string;

  @ApiProperty()
  readonly todos!: FormattedAccountTodo[];
}
