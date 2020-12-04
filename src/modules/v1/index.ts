import { Module } from '@nestjs/common';

import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';

@Module({ imports: [AccountModule, AuthModule, TodoModule] })
export class ModulesV1 {}
