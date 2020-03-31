export default {
  type: process.env.E2E_TEST_CONNECTION,
  host: process.env.E2E_TEST_HOST,
  port: Number(process.env.E2E_TEST_PORT),
  username: process.env.E2E_TEST_USERNAME,
  password: process.env.E2E_TEST_PASSWORD,
  database: process.env.E2E_TEST_DATABASE,
  entities: process.env.E2E_TEST_ENTITIES?.split(','),
  entitiesDir: process.env.E2E_TEST_ENTITIES_DIR,
  synchronize: true,
  bigNumberStrings: false,
  timezone: 'Z',
};
