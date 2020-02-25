import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Base } from './base';

export enum TodoStatus {
  Doing = 'DOING',
  Done = 'DONE',
}

@Entity()
export class Todo extends Base {
  @PrimaryGeneratedColumn('uuid')
  public uuid!: string;

  @Column('text')
  public message!: string;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.Doing,
  })
  public status!: TodoStatus;
}
