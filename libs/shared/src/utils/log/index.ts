import { ILogger } from '../../types/ILogger';
import { Logger, transports, format, createLogger } from 'winston';
import { config } from '../../config';
import path from 'path';
import fs, { write } from 'fs';
import appRoot from 'app-root-path';
import { Handler } from 'express';
import morgan from 'morgan';

export class ServerLogger implements ILogger {
  private logger: Logger;
  private readonly logsDirectory: string;

  constructor() {
    this.logsDirectory = path.resolve(`${appRoot}`, 'logs');
    if (!fs.existsSync(this.logsDirectory)) {
      fs.mkdirSync(this.logsDirectory);
    }

    const option = {
      infofile: {
        level: 'info',
        filename: path.resolve(this.logsDirectory, 'info.log'),
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      },
      errorFile: {
        level: 'error',
        filename: path.resolve(this.logsDirectory, 'error.log'),
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      },
    };

    const loggerTransport = {
      console: new transports.Console({
        format: format.combine(format.colorize(), format.simple()),
      }),
      info: new transports.File(option.infofile),
      error: new transports.File(option.errorFile),
    };

    this.logger = createLogger({
      level: config.APP_LOG_LEVEL || 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      ),
      transports: [
        loggerTransport.console,
        loggerTransport.info,
        loggerTransport.error,
      ],
      exitOnError: false,
    });
  }

  public stream(): Handler {
    return morgan('combined', {
      stream: {
        write: (message: string) => {
          this.logger.info(message.trim());
        },
      },
    });
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }
  public info(message: string): void {
    this.logger.info(message);
  }
  public error(message: string): void {
    this.logger.error(message);
  }
  public warning(message: string): void {
    this.logger.warn(message);
  }
  public critical(message: string): void {
    this.logger.crit(message);
  }
}
