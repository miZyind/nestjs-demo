import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LogInDto {
  @IsEmail()
  @ApiProperty({ format: 'email', example: 'todo@example.com' })
  readonly email!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ format: 'password', example: '123456' })
  readonly attempt!: string;
}
