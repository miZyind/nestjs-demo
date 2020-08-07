export = {
  type: String(process.env.TYPEORM_CONNECTION),
  host: String(process.env.TYPEORM_HOST),
  port: Number(process.env.TYPEORM_PORT),
  username: String(process.env.TYPEORM_USERNAME),
  password: String(process.env.TYPEORM_PASSWORD),
  database: String(process.env.TYPEORM_DATABASE),
  logging: process.env.TYPEORM_LOGGING === 'true',
  entities: process.env.TYPEORM_ENTITIES?.split(','),
  migrations: process.env.TYPEORM_MIGRATIONS?.split(','),
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  dropSchema: process.env.TYPEORM_DROP_SCHEMA === 'true',
  // Extra
  bigNumberStrings: false,
  timezone: 'Z',
  // CLI
  entitiesDir: String(process.env.TYPEORM_ENTITIES_DIR),
  migrationsDir: String(process.env.TYPEORM_MIGRATIONS_DIR),
};
