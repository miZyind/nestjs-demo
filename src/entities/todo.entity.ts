import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Account } from './account.entity';
import { Base } from './base.entity';

export enum TodoStatus {
  Doing = 'DOING',
  Done = 'DONE',
}

@Entity()
export class Todo extends Base {
  @PrimaryGeneratedColumn('uuid')
  readonly uuid!: string;

  @Column('text')
  message!: string;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.Doing,
  })
  status!: TodoStatus;

  @JoinColumn({ name: 'accountUUID' })
  @ManyToOne(() => Account)
  account!: Account;
}
