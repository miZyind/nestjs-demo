import { resolve } from 'path';

import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppConfig } from '#configs';
import { ModulesV1 } from '#v1';

export function setup(
  app: INestApplication,
  { name, basePath }: AppConfig,
): void {
  const config = new DocumentBuilder().setTitle(`${name} API`);
  const options: SwaggerCustomOptions = {
    swaggerOptions: {
      defaultModelExpandDepth: 10,
      defaultModelsExpandDepth: -1,
    },
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .scheme-container .schemes>label { display: none }
      .swagger-ui .scheme-container {
        padding: unset;
        background: unset;
        box-shadow: unset;
        margin: -85px 0 0 0;
        padding-bottom: 30px;
      }
      .swagger-ui .download-contents { display: none }
      .swagger-ui .copy-to-clipboard {
        position: absolute;
        bottom: 10px;
        right: 10px;
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
