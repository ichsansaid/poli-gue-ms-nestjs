import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ErrorBase } from 'src/internal/pkg/error.base';

export class ErrorBaseFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (exception instanceof ErrorBase) {
      const error_status_map = {
        UnauthorizedError: 401,
        ExpiredAuthError: 401,
        ForbiddenError: 403,
      };
      const status = error_status_map[exception.constructor.name] || 400;
      response.status(status).json({
        message: exception.message,
        errors: exception.data,
      });
    } else if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json(exception.getResponse());
    } else if (exception instanceof Error) {
      console.error(exception.stack);
      response.status(500).json(exception.message);
    } else {
      response.status(500).json(exception);
    }
  }
}
