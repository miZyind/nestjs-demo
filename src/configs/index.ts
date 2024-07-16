export type AppConfig = typeof import('./app');
export type DatabaseConfig = typeof import('./database');
export type RMQConfig = typeof import('./rmq');

enum Config {
  App = 'APP',
  Database = 'DATABASE',
  RMQ = 'RMQ',
}

export default Config;
