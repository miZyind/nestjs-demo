import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Account } from '#entities/account.entity';
import { Base } from '#entities/base.entity';

export enum TodoStatus {
  Doing = 'DOING',
  Done = 'DONE',
}

@Entity()
export class Todo extends Base {
  @PrimaryGeneratedColumn('uuid')
  readonly uuid!: string;

  @Column({ default: TodoStatus.Doing })
  readonly status!: TodoStatus;

  @Column('text')
  readonly message!: string;

  @JoinColumn({ name: 'accountUUID' })
  @ManyToOne(() => Account)
  readonly account!: Account;
}
