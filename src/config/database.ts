const { TYPEORM_ENTITIES, TYPEORM_MIGRATIONS } = process.env;

export default {
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: TYPEORM_ENTITIES ? TYPEORM_ENTITIES.split(',') : TYPEORM_ENTITIES,
  entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
  migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
  migrations: TYPEORM_MIGRATIONS
    ? TYPEORM_MIGRATIONS.split(',')
    : TYPEORM_MIGRATIONS,
  migrationsDir: process.env.DB_MIGRATIONS_DIR,
  logging: process.env.TYPEORM_LOGGING === 'true',
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
};
