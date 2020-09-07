import { Type } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { StandardList, StandardResponse } from '#models';

export function Standardized<T>(type?: Type<T>): Type<StandardResponse<T>> {
  class StandardizedEntity<D> implements StandardResponse<D> {
    @ApiProperty({ example: 0 })
    code!: number;

    @ApiProperty({ example: 'Success' })
    message!: string;

    @ApiProperty({ type, example: type ?? null })
    data!: D;
  }

  Object.defineProperty(StandardizedEntity, 'name', {
    value: `Standardized${
      typeof type === 'undefined' ? 'Response' : type.name
    }`,
  });

  return StandardizedEntity;
}

export function StandardizedList<T>(
  type: Type<T>,
): Type<StandardResponse<StandardList<T>>> {
  class EntityList<D> implements StandardList<D> {
    @ApiProperty({ type, isArray: true })
    data!: D[];

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

  class StandardizedEntityList<D> implements StandardResponse<EntityList<D>> {
    @ApiProperty({ example: 0 })
    code!: number;

    @ApiProperty({ example: 'Success' })
    message!: string;

    @ApiProperty({ type: EntityList })
    data!: EntityList<D>;
  }

  Object.defineProperty(StandardizedEntityList, 'name', {
    value: `Standardized${type.name}List`,
  });

  return StandardizedEntityList;
}
