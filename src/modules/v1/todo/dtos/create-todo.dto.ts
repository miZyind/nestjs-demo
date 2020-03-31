import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Remember to buy 3 eggs before tonight' })
  message!: string;
}
