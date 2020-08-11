import { INestApplication } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

import { RMQConfig } from '#configs';

export function setup(
  app: INestApplication,
  options: RMQConfig['options'],
): void {
  app.connectMicroservice({ transport: Transport.RMQ, options });
}
