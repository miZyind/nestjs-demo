import { Controller, Get, Inject } from '@nestjs/common';

import Config, { AppConfig } from '#configs';

@Controller()
export class AppController {
  constructor(
    @Inject(`CONFIGURATION(${Config.App})`)
    private readonly appConfig: AppConfig,
  ) {}

  @Get()
  getAppConfig(): Pick<
    AppConfig,
    'basePath' | 'host' | 'name' | 'port' | 'version'
  > {
    const { name, version, host, port, basePath } = this.appConfig;

    return { name, version, host, port, basePath };
  }
}
