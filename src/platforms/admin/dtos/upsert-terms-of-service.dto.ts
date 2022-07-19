import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInstance,
  IsInt,
  IsLocale,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { LocaleCode } from '#app/app.constant';
import { TermsOfServiceTranslation } from '#entities/terms-of-service-translation.entity';

class AdminUpsertTermsOfServiceTranslation {
  @IsLocale()
  @ApiProperty({
    pattern: '^[A-z]{2,4}([_-]([A-z]{4}|[d]{3}))?([_-]([A-z]{2}|[d]{3}))?$',
    example: 'en-US',
  })
  readonly code!: LocaleCode;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:
      'A terms of service agreement explains the guidelines of your website.',
  })
  readonly content!: string;
}

export class AdminUpsertTermsOfServiceDTO {
  @IsOptional()
  @IsPositive()
  @IsInt()
  @ApiProperty({ type: 'integer', minimum: 1 })
  readonly version?: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'This is the first version of terms of service' })
  readonly note!: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInstance(TermsOfServiceTranslation, { each: true })
  @Type(() => TermsOfServiceTranslation)
  @ApiProperty()
  readonly translations!: AdminUpsertTermsOfServiceTranslation[];
}
