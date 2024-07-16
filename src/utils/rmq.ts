import { Transport } from '@nestjs/microservices';

import type { INestApplication } from '@nestjs/common';
import type { RMQConfig } from '#configs';

export function setup(
  app: INestApplication,
  options: RMQConfig['options'],
): void {
  app.connectMicroservice({ transport: Transport.RMQ, options });
}
