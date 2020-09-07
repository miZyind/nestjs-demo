import { ApiProperty } from '@nestjs/swagger';

export class LogInResponse {
  @ApiProperty({ example: 'AAAAAAMLheAAAAAAA0%2BuSeid' })
  readonly token!: string;
}
