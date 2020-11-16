import { resolve } from 'path';

import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { AuthStrategy } from '#app/app.constant';
import { AppConfig } from '#configs';
import { ModulesV1 } from '#v1';

export function setup(
  app: INestApplication,
  { name, basePath }: AppConfig,
): void {
  const config = new DocumentBuilder()
    .setTitle(`${name} API`)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      AuthStrategy.JWT,
    );
  const options: SwaggerCustomOptions = {
    swaggerOptions: {
      defaultModelExpandDepth: 10,
      defaultModelsExpandDepth: -1,
    },
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .information-container .info { margin: 20px 0 }
      .swagger-ui .scheme-container {
        padding: unset;
        background: unset;
        box-shadow: unset;
        margin: -60px 0 0 0;
        padding-bottom: 30px;
      }
      .swagger-ui .download-contents { display: none }
      .swagger-ui .copy-to-clipboard {
        bottom: 5px;
        right: 10px;
        width: 20px;
        height: 20px;
      }
      .swagger-ui .copy-to-clipboard button {
        padding-left: 18px;
        height: 18px;
      }
    `,
    customSiteTitle: `${name} API`,
  };

  SwaggerModule.setup(
    resolve(basePath, 'v1'),
    app,
    SwaggerModule.createDocument(app, config.build(), {
      include: [ModulesV1],
      deepScanRoutes: true,
    }),
    options,
  );
}
