import supertest from 'supertest';
import { Repository } from 'typeorm';

import { HttpServer, HttpStatus, INestApplication } from '@nestjs/common';

import { Todo, TodoStatus } from '../../../entities/todo.entity';
import { initializeE2ETestModule } from '../e2e-test';
import { TodoError } from './todo.constant';
import { TodoModule } from './todo.module';

describe('Todo', () => {
  let app: INestApplication;
  let repository: Repository<Todo>;

  beforeAll(async () => {
    const { module, app: testApp } = await initializeE2ETestModule(TodoModule);

    app = testApp;

    repository = module.get('TodoRepository');

    await app.init();
  });

  afterEach(async () => {
    await repository.query('DELETE FROM todo;');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /v1/todos', () => {
    it('should create a new todo successfully', async () => {
      const message = 'Test todo';

      await supertest
        .agent(app.getHttpServer() as HttpServer)
        .post('/v1/todos')
        .send({ message })
        .expect(HttpStatus.CREATED);

      const newTodo = await repository.findOne({ message });

      expect(newTodo?.message).toEqual(message);
    });
  });

  describe('GET /v1/todos', () => {
    it('should return an array of todos', async () => {
      await repository.save([
        { message: 'test-todo-msg-0' },
        { message: 'test-todo-msg-1' },
      ]);

      const { body } = await supertest
        .agent(app.getHttpServer() as HttpServer)
        .get('/v1/todos')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(HttpStatus.OK);

      expect(body as unknown).toEqual({
        data: expect.arrayContaining([
          {
            uuid: expect.any(String),
            message: 'test-todo-msg-0',
            status: TodoStatus.Doing,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          },
          {
            uuid: expect.any(String),
            message: 'test-todo-msg-1',
            status: TodoStatus.Doing,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          },
        ]),
        count: 2,
        total: 2,
        page: 1,
        pageCount: 1,
      });
    });
  });

  describe('PATCH /v1/todos/:uuid', () => {
    it('should update a existing todo successfully', async () => {
      const originalMessage = 'test-todo-msg-0';
      const updatedMessage = 'test-todo-msg-1';
      const todo = repository.create({ message: originalMessage });

      await repository.save(todo);

      await supertest
        .agent(app.getHttpServer() as HttpServer)
        .patch(`/v1/todos/${todo.uuid}`)
        .send({ message: updatedMessage })
        .expect(HttpStatus.OK);

      const updatedTodo = await repository.findOne(todo.uuid);

      expect(updatedTodo?.message).toEqual(updatedMessage);
    });

    it('should respond a bad request exception with todo not found message', async () => {
      const fakeUUID = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

      const { body } = await supertest
        .agent(app.getHttpServer() as HttpServer)
        .patch(`/v1/todos/${fakeUUID}`)
        .send({ message: 'test-todo-msg' })
        .expect(HttpStatus.BAD_REQUEST);

      expect(body as unknown).toEqual({
        error: 'Bad Request',
        message: TodoError.TodoNotFound,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    });
  });

  describe('DELETE /v1/todos/:uuid', () => {
    it('should update a existing todo successfully', async () => {
      const todo = repository.create({ message: 'test-todo-msg' });

      await repository.save(todo);

      await supertest
        .agent(app.getHttpServer() as HttpServer)
        .delete(`/v1/todos/${todo.uuid}`)
        .expect(HttpStatus.OK);

      const deletedTodo = await repository.findOne(todo.uuid);

      expect(deletedTodo).toEqual(undefined);
    });

    it('should respond a bad request exception with todo not found message', async () => {
      const fakeUUID = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

      const { body } = await supertest
        .agent(app.getHttpServer() as HttpServer)
        .delete(`/v1/todos/${fakeUUID}`)
        .expect(HttpStatus.BAD_REQUEST);

      expect(body as unknown).toEqual({
        error: 'Bad Request',
        message: TodoError.TodoNotFound,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    });
  });
});
