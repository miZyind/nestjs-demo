import { Channel, Message } from 'amqplib';

import { BaseRpcContext } from '@nestjs/microservices/ctx-host/base-rpc.context';

module '@nestjs/microservices' {
  export class RmqContext extends BaseRpcContext<[Message, Channel, string]> {
    /**
     * Returns the original message (with properties, fields, and content).
     */
    getMessage(): Message;
    /**
     * Returns the reference to the original RMQ channel.
     */
    getChannelRef(): Channel;
    /**
     * Returns the name of the pattern.
     */
    getPattern(): string;
  }
}
