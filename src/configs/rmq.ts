export = {
  enable: process.env.RMQ_ENABLE === 'true',
  options: {
    urls: [String(process.env.RMQ_URL)],
    queue: 'nestjs_demo_queue',
    prefetchCount: 1,
    noAck: false,
    queueOptions: { durable: false },
    socketOptions: { noDelay: true },
  },
};
