import { Global, Module } from '@nestjs/common';

import { RMQService } from './rmq.service';

@Global()
@Module({
  providers: [RMQService],
  exports: [RMQService],
})
export class RMQModule {}
