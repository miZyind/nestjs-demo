import { resolve } from 'path';

import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { ModulesV1 } from './modules/v1';
import { ModulesV2 } from './modules/v2';

export function Swagger(
  app: INestApplication,
  name: string,
  basePath: string,
): void {
  const config = new DocumentBuilder()
    .setTitle(`${name} API`)
    .setDescription(`The ${name} API description`)
    .addBearerAuth();
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
      `,
    customSiteTitle: `${name} API`,
  };
  SwaggerModule.setup(
    resolve(basePath, 'v1'),
    app,
    SwaggerModule.createDocument(app, config.setVersion('1.0.0').build(), {
      include: [ModulesV1],
      deepScanRoutes: true,
    }),
    options,
  );
  SwaggerModule.setup(
    resolve(basePath, 'v2'),
    app,
    SwaggerModule.createDocument(app, config.setVersion('2.0.0').build(), {
      include: [ModulesV2],
      deepScanRoutes: true,
    }),
    options,
  );
}
