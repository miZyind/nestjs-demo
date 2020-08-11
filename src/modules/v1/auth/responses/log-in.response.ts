import { ApiProperty } from '@nestjs/swagger';

import { Standardized } from '#utils/standardizer';

export class LogInInfo {
  @ApiProperty({ example: 'AAAAAAMLheAAAAAAA0%2BuSeid' })
  readonly token!: string;
}

export type LogInResponse = LogInInfo;

export const LogInResponse = Standardized(LogInInfo);
