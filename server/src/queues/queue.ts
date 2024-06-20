import { Queue } from "bullmq";
import { ALL_EVENTS } from "../constant";
import logger from "../logger";
import eventEmitter from '../event-manager';

const redisConnection = {
    host: process.env.REDIS_SERVER || 'localhost',
    port: 6379,
  };
  
  const queues = Object.values(ALL_EVENTS).map((queueName) => {
    return {
      name: queueName,
      queueObj: new Queue(queueName, { connection: redisConnection }),
    };
  });
  
  const addQueueItem = async (queueName:string, item: any) => {
    logger.info('addQueueItem', queueName, item);
    const queue = queues.find((q) => q.name === queueName);
    if (!queue) {
      throw new Error(`queue ${queueName} not found`);
    }
  
    // TODO: update history : { status: queueName, createdAt: now }
    eventEmitter.emit(`${queueName}`, item);
    await queue.queueObj.add(queueName, item, {
      removeOnComplete: true,
      removeOnFail: false,
    });
  };

  export {

    addQueueItem
  }