export = {
  name: String(process.env.APP_NAME),
  version: String(process.env.APP_VERSION),
  host: String(process.env.APP_HOST),
  port: Number(process.env.APP_PORT),
  basePath: String(process.env.APP_BASE_PATH),
};
