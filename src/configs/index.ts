export type AppConfig = typeof import('./app');
export type DatabaseConfig = typeof import('./database');
export type RMQConfig = typeof import('./rmq');
export type SwaggerConfig = typeof import('./swagger');

enum Config {
  App = 'APP',
  Database = 'DATABASE',
  RMQ = 'RMQ',
  Swagger = 'SWAGGER',
}

export default Config;
