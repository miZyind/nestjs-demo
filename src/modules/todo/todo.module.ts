import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Todo } from '#entities/todo.entity';
import { TodoProtectedController } from '#modules/todo/todo.protected.controller';
import { TodoService } from '#modules/todo/todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodoService],
  controllers: [TodoProtectedController],
  exports: [TodoService],
})
export class TodoModule {}
