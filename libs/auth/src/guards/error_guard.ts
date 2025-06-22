import { NextFunction, Request, Response } from 'express';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
  ServerLogger,
  UnauthorizedException,
} from '@stores/shared';

export const errorGuard = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logger = new ServerLogger();

  if (err instanceof BadRequestException) {
    logger.error(`Bad Request: ${err.message}`);

    res.status(err.statusCode).json({
      message: err.message,
      details: err.details || {},
    });
  } else if (
    err instanceof UnauthorizedException ||
    err instanceof ForbiddenException ||
    err instanceof ConflictException ||
    err instanceof NotFoundException
  ) {
    logger.error(`${err.constructor.name}: ${err.message}`);

    res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
    logger.error(`Internal Server Error: ${err.message}`);

    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
