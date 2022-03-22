import { Controller, Get, Inject } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

import Config, { AppConfig } from '#configs';

@Controller()
export class AppBaseController {
  constructor(
    @Inject(`CONFIGURATION(${Config.App})`)
    private readonly appConfig: AppConfig,
  ) {}

  @Get()
  @ApiExcludeEndpoint()
  getAppConfig(): Pick<AppConfig, 'host' | 'name' | 'port'> {
    const { name, host, port } = this.appConfig;

    return { name, host, port };
  }
}
