import { ConfigService, InjectConfig } from 'nestjs-config';

import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

import { Config } from '../../config';

export class RMQService {
  readonly client: ClientProxy;

  constructor(@InjectConfig() configService: ConfigService) {
    const { options } = configService.get(Config.RMQ);
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options,
    });
  }
}
