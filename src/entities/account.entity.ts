import { compare, hash } from 'bcrypt';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BCRYPT_SALT_ROUNDS } from '#app/app.constant';

import { Base } from './base.entity';
import { Todo } from './todo.entity';

export enum AccountStatus {
  ApprovePending = 'APPROVE_PENDING',
  Approved = 'APPROVED',
  Banned = 'BANNED',
}

export enum AccountRole {
  User = 'User',
  Admin = 'Admin',
}

@Entity()
export class Account extends Base {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.ApprovePending,
  })
  status!: AccountStatus;

  @Column({ type: 'enum', enum: AccountRole })
  role!: AccountRole;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Todo, ({ account }) => account)
  todos!: Todo[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, BCRYPT_SALT_ROUNDS);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return compare(attempt, this.password);
  }
}
