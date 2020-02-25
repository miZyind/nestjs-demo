import { ConfigService, InjectConfig } from 'nestjs-config';

import { Controller, Get } from '@nestjs/common';

import { AppInfo, Config } from '../../config';

@Controller()
export class InfoController {
  private readonly appInfo: AppInfo;

  constructor(@InjectConfig() config: ConfigService) {
    this.appInfo = config.get(Config.App);
  }

  @Get()
  getInfo(): AppInfo {
    return this.appInfo;
  }
}
