import { ConfigModule, ConfigService } from 'nestjs-config';
import { resolve } from 'path';

import { ValidationPipe } from '@nestjs/common';
import { INestApplication, ModuleMetadata } from '@nestjs/common/interfaces';
import { AuthGuard } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Config } from '../../config';

export async function initializeE2ETestModule(
  ...modules: NonNullable<ModuleMetadata['imports']>
): Promise<{ module: TestingModule; app: INestApplication }> {
  const module = await Test.createTestingModule({
    imports: [
      ConfigModule.load(resolve(process.cwd(), 'src/config/*.ts')),
      TypeOrmModule.forRootAsync({
        useFactory: (config: ConfigService) =>
          config.get(Config.E2ETest) as TypeOrmModuleOptions,
        inject: [ConfigService],
      }),
      ...modules,
    ],
  })
    .overrideGuard(AuthGuard('jwt'))
    .useValue({ canActivate: () => true })
    .compile();
  const app = module.createNestApplication();

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  return { module, app };
}
