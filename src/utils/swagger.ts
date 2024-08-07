import { customOptions } from 'nestjs-xion/swagger';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { BaseAppModule } from '#app/app.module';
import { AuthStrategy } from '#modules/auth/auth.constant';

import type { INestApplication } from '@nestjs/common';
import type { AppConfig } from '#configs';

export function setup(app: INestApplication, { name }: AppConfig): void {
  const config = new DocumentBuilder()
    .setTitle(name)
    .addBearerAuth({ type: 'http' }, AuthStrategy.JWT)
    .addSecurity(AuthStrategy.Secret, {
      type: 'apiKey',
      name: AuthStrategy.Secret,
      in: 'header',
    });

  SwaggerModule.setup(
    'doc',
    app,
    SwaggerModule.createDocument(app, config.build(), {
      include: [BaseAppModule],
      deepScanRoutes: true,
    }),
    customOptions(name),
  );
}
