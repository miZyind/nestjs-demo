import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { StandardResponse } from '#models';

export function Standardized(type?: Function): Function {
  class StandardizedEntity<T> implements StandardResponse<T> {
    @ApiProperty({ example: 0 })
    code!: number;

    @ApiProperty({ example: 'Success' })
    message!: string;

    @ApiProperty({ type, example: type ?? null })
    data!: T;
  }

  Object.defineProperty(StandardizedEntity, 'name', {
    value: `Standardized${
      typeof type === 'undefined' ? 'Response' : type.name
    }`,
  });

  return StandardizedEntity;
}

export function StandardizedList(type: Function): Function {
  class EntityList<T> {
    @ApiProperty({ type, isArray: true })
    data!: T[];

    @ApiPropertyOptional({ example: 1 })
    count?: number;

    @ApiProperty({ example: 1 })
    total!: number;

    @ApiPropertyOptional({ example: 1 })
    page?: number;

    @ApiPropertyOptional({ example: 1 })
    pageCount?: number;
  }

  Object.defineProperty(EntityList, 'name', {
    value: `${type.name}List`,
  });

  class StandardizedEntityList<T> implements StandardResponse<EntityList<T>> {
    @ApiProperty({ example: 0 })
    code!: number;

    @ApiProperty({ example: 'Success' })
    message!: string;

    @ApiProperty({ type: EntityList })
    data!: EntityList<T>;
  }

  Object.defineProperty(StandardizedEntityList, 'name', {
    value: `Standardized${type.name}List`,
  });

  return StandardizedEntityList;
}
