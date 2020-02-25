import APP from './app';

export enum Config {
  App = 'app',
  Database = 'database',
  Swagger = 'swagger',
}

export type AppInfo = typeof APP;
