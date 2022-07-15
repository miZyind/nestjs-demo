import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoResponse {
  @ApiProperty({ format: 'uuid' })
  readonly uuid!: string;
}
