import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Base } from './base.entity';

export enum TodoStatus {
  Doing = 'DOING',
  Done = 'DONE',
}

@Entity()
export class Todo extends Base {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column('text')
  message!: string;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.Doing,
  })
  status!: TodoStatus;
}
