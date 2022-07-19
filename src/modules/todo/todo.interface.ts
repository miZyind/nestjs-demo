import type { TodoStatus } from '#entities/todo.entity';

export interface CreateTodoDTO {
  message: string;
}

export interface CreateTodoResponse {
  uuid: string;
}

export interface UpdateTodoDTO {
  status?: TodoStatus;
  message?: string;
}
