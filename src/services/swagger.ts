import { customOptions } from 'nestjs-xion/swagger';
import { resolve } from 'path';

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppConfig } from '#configs';
import { ModulesV1 } from '#v1';
import { AuthStrategy as AuthStrategyV1 } from '#v1/auth/auth.constant';

export function setup(
  app: INestApplication,
  { name, basePath }: AppConfig,
): void {
  const config = new DocumentBuilder()
    .setTitle(`${name} API`)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      AuthStrategyV1.JWT,
    );

  SwaggerModule.setup(
    resolve(basePath, 'v1'),
    app,
    SwaggerModule.createDocument(app, config.build(), {
      include: [ModulesV1],
      deepScanRoutes: true,
    }),
    customOptions(name),
  );
}
