import { ApiProperty } from '@nestjs/swagger';

export class AdminUpsertTermsOfServiceResponse {
  @ApiProperty({ type: 'integer', minimum: 1 })
  readonly version!: number;
}
