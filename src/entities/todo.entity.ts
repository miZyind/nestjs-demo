import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '#entities/user.entity';
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

  @JoinColumn({ name: 'userUUID' })
  @ManyToOne(() => User)
  readonly user!: User;
}
