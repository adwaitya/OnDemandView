import { createLogger, format, transports, Logger } from 'winston';

class LogManager {
  private logger: Logger;
  static instance:LogManager;
  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} ${level}: ${message}`;
        })
      ),
      transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' })
      ],
    });

    // If we're not in production then log to the console with the colorized simple format.
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new transports.Console({
        format: format.simple(),
      }));
    }
  }

  info(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  getLogger() {
    return this.logger;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new LogManager();
    }

    return this.instance;
  }
}

export default  LogManager.getInstance().getLogger()
