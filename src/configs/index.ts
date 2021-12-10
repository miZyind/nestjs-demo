import { readdirSync } from 'fs';

import { registerAs } from '@nestjs/config';

import type { ConfigFactoryKeyHost } from '@nestjs/config';

type TFactory = () => Promise<unknown>;
type RegisteredConfig = ConfigFactoryKeyHost<ReturnType<TFactory>> & TFactory;

export function load(): RegisteredConfig[] {
  return readdirSync(__dirname)
    .filter((file) => !file.includes('index.js'))
    .map((file) =>
      registerAs(
        file.replace('.js', '').toUpperCase(),
        () => import(`./${file}`),
      ),
    );
}

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
