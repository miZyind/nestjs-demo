import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';

@Module({ imports: [AuthModule, TodoModule] })
export class ModulesV1 {}
