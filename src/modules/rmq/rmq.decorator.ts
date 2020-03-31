import { Inject } from '@nestjs/common';

import { RMQService } from './rmq.service';

export function InjectRMQ(): ParameterDecorator {
  return Inject(RMQService);
}
