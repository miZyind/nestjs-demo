export default {
  enable: process.env.RABBITMQ_ENABLE === 'true',
  options: {
    urls: process.env.RABBITMQ_URLS?.split(','),
    queue: 'nestjs_demo_queue',
    prefetchCount: 1,
    noAck: false,
    queueOptions: { durable: false },
    socketOptions: { noDelay: true },
  },
};
