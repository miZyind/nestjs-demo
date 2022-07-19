import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum SystemLogType {
  UserStatistic = 'USER_STATISTIC',
}

@Entity()
export class SystemLog {
  @CreateDateColumn()
  readonly loggedAt!: Date;

  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  readonly type!: SystemLogType;

  @Column('text')
  readonly note!: string;

  @Column({ type: 'json' })
  readonly data!: Record<string, unknown>;
}
