import APP from './app';

export enum Config {
  App = 'app',
  Database = 'database',
  E2ETest = 'e2e-test',
  RMQ = 'rmq',
  Swagger = 'swagger',
}

export type AppInfo = typeof APP;
