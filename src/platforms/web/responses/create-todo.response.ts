import { ApiProperty } from '@nestjs/swagger';

export class WebCreateTodoResponse {
  @ApiProperty({ format: 'uuid' })
  readonly uuid!: string;
}
