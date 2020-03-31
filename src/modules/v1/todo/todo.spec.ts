import supertest from 'supertest';
import { Repository } from 'typeorm';

import { HttpServer, HttpStatus, INestApplication } from '@nestjs/common';

import { Todo, TodoStatus } from '../../../entities/todo.entity';
import { initializeE2ETestModule } from '../e2e-test';
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

      expect(body as unknown).toEqual([
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
      ]);
    });
  });
});
