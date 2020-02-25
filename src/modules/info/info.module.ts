import { ConfigModule } from 'nestjs-config';

import { Module } from '@nestjs/common';

import { InfoController } from './info.controller';

@Module({ imports: [ConfigModule], controllers: [InfoController] })
export class InfoModule {}
