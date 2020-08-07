import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import Config, { AppConfig } from '#configs';

@Controller()
export class AppController {
  constructor(private readonly config: ConfigService) {}

  @Get()
  getAppConfig(): Pick<
    AppConfig,
    'name' | 'version' | 'host' | 'port' | 'basePath'
  > {
    const { name, version, host, port, basePath } = this.config.get(
      Config.App,
    ) as AppConfig;

    return { name, version, host, port, basePath };
  }
}
