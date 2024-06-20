import { QueueEvents , Worker} from "bullmq";
import logger from "../logger";
import { VIDEO_QUEUE_EVENTS } from "../constant";

const redisConnection = {
  host: process.env.REDIS_SERVER || "localhost",
  port: 6379,
};

const listenQueueEvent = (queueName:string) => {
  const queueEvents = new QueueEvents(queueName, {
    connection: redisConnection,
  });
  queueEvents.on('failed', ({ jobId, failedReason }) => {
    logger.info(`${jobId} has failed with reason ${failedReason}`);
  });

  const worker = new Worker(
    queueName,
    async (job) => {
      const handler = null;//QUEUE_EVENT_HANDLERS[queueName];
      if (handler) {
        // return await handler(job);
      }
    //   throw new Error('No handler found for queue: ' + queueName);
    },
    { connection: redisConnection }
  );

  worker.on('completed', (job) => {
    logger.info(`${job.id} has completed!`);
  });

  worker.on('failed', (job, err) => {
    logger.info(`${job?.id} has failed with ${err.message}`);
  });

  logger.info(queueName, ' worker started', new Date().toTimeString());
};


const setupAllQueueEvents = () => {
    Object.values(VIDEO_QUEUE_EVENTS).map((queueName) =>
      listenQueueEvent(queueName)
    );
  
    // const { setup: setupVideoHandler } = require('../models/video/handler');
    // setupVideoHandler();
    return true;
  };

  export {
    listenQueueEvent, setupAllQueueEvents
  }