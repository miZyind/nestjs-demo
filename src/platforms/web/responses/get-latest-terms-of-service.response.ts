import { ApiProperty } from '@nestjs/swagger';

export class WebGetLatestTermsOfServiceResponse {
  @ApiProperty()
  readonly updatedAt!: Date;

  @ApiProperty({ type: 'integer', minimum: 1 })
  readonly version!: number;

  @ApiProperty()
  readonly content!: string;
}
