import { ApiProperty } from '@nestjs/swagger';

/**
 * Response format with pagination and Swagger
 * https://github.com/nestjsx/crud/issues/114
 */

export function getManyResponseFor(type: Function): Function {
  class GetManyResponseForEntity<T> {
    @ApiProperty({ type, isArray: true })
    data!: T[];

    @ApiProperty({ example: 1 })
    count!: number;

    @ApiProperty({ example: 10 })
    total!: number;

    @ApiProperty({ example: 1 })
    page!: number;

    @ApiProperty({ example: 10 })
    pageCount!: number;
  }

  Object.defineProperty(GetManyResponseForEntity, 'name', {
    value: `GetManyResponseFor${type.name}`,
  });

  return GetManyResponseForEntity;
}
