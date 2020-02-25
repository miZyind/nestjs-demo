import supertest from 'supertest';
import { Repository } from 'typeorm';

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Todo, TodoStatus } from '../../../entities/todo';
import { TodoModule } from './todo.module';

describe('Todo', () => {
  let app: INestApplication;
  let repository: Repository<Todo>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TodoModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'nestjs',
          password: '123456',
          database: 'nestjs_demo',
          entities: ['src/entities/*.ts'],
          synchronize: false,
        }),
      ],
    }).compile();

    app = module.createNestApplication();
    repository = module.get('TodoRepository');
    await app.init();
  });

  afterEach(async () => {
    await repository.query(`DELETE FROM todo;`);
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
        .agent(app.getHttpServer())
        .get('/v1/todos')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(body).toEqual([
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
