import { INestApplication } from '@nestjs/common';
import { RmqOptions, Transport } from '@nestjs/microservices';

export function setupRMQ(
  app: INestApplication,
  options: RmqOptions['options'],
): void {
  app.connectMicroservice({ transport: Transport.RMQ, options });
}
