import { ILogger } from '../types/ILogger';
import { Logger } from 'winston';

export class ServerLogger implements ILogger {
  private logger: Logger;
  //   private readonly logsDirectory: string;

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
