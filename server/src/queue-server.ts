import { Queue } from "bullmq";
import { VIDEO_QUEUE_EVENTS } from "./constant";
import logger from "./logger";
import eventEmitter from "./event-manager";
import { setupAllQueueEvents } from "./queues/worker";

const setup = async () => {
  const status = setupAllQueueEvents();
  logger.info("setupAllQueueEvents: ", status);
};

setup();
