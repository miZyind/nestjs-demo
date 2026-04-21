import { Todo } from '#entities/todo.entity';
import { TodoService } from '#modules/todo/todo.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
