import { Module } from '@nestjs/common';

import { TodoModule } from './todo/todo.module';

@Module({ imports: [TodoModule] })
export class ModulesV1 {}
