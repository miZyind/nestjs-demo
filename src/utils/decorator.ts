import { UseInterceptors } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { CrudRequestInterceptor } from '@nestjsx/crud';

import { SafeCrudRequestInterceptor } from './intercreptor';

export function ApiCrudQueries() {
  return function <T>(
    target: object,
    key: string,
    descriptor: TypedPropertyDescriptor<T>,
  ): void {
    ApiQuery({
      name: 'filter',
      type: 'string',
      required: false,
      description:
        '<h4>Adds fields request condition (multiple conditions) to the request.</h4><i>Syntax:</i> <strong>?filter=field||condition||value</strong><br/>Filter Conditions:<ul> <li> <strong><code>eq</code></strong> (<code>=</code>, equal) </li><li> <strong><code>ne</code></strong> (<code>!=</code>, not equal) </li><li> <strong><code>gt</code></strong> (<code>&gt;</code>, greater than) </li><li> <strong><code>lt</code></strong> (<code>&lt;</code>, lower that) </li><li> <strong><code>gte</code></strong> (<code>&gt;=</code>, greater than or equal) </li><li> <strong><code>lte</code></strong> (<code>&lt;=</code>, lower than or equal) </li><li> <strong><code>cont</code></strong> (<code>LIKE %val%</code>, contains) </li></ul>',
    })(target, key, descriptor);
    ApiQuery({
      name: 'limit',
      type: 'number',
      required: false,
      description:
        '<h4>Receive <code>N</code> amount of entities.</h4><i>Syntax:</i> <strong>?limit=number</strong><br/><i>Example:</i> <strong>?limit=10</strong><br/><i>Default:</i> <strong>8</strong>',
    })(target, key, descriptor);
    ApiQuery({
      name: 'page',
      type: 'number',
      required: false,
      description:
        '<h4>Receive a portion of <code>limit</code> entities (alternative to <code>offset</code>). Will be applied if <code>limit</code> is set up.</h4><i>Syntax:</i> <strong>?page=number</strong><br/><i>Example:</i> <strong>?page=2</strong><br/><i>Default:</i> <strong>1</strong>',
    })(target, key, descriptor);
  };
}

export function UseCrudInterceptors(): ReturnType<typeof UseInterceptors> {
  return UseInterceptors(CrudRequestInterceptor, SafeCrudRequestInterceptor);
}
