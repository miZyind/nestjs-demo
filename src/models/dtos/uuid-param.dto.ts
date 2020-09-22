import { IsUUID } from 'class-validator';

export class UUIDParamDTO {
  @IsUUID()
  uuid!: string;
}
