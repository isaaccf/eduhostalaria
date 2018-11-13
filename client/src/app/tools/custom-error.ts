import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { LoggingService } from './analytics.service';
import { HTTP_STATUS } from './http-status.enum';

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  constructor(private loggingService: LoggingService) {}

  handleError(error) {
    if (error instanceof HttpErrorResponse) {
      const category = 'Error.HTTP';
      this.loggingService.sendEvent(
        category + (this.isSecurityError(error) ? '.Security' : ''),
        this.getMessageFromResponse(error),
        this.getMessage(error)
      );
    } else {
      this.loggingService.sendError(
        this.getMessage(error),
        error.stack || window.location || ''
      );
    }

    throw error;
  }
  private getMessage(error: HttpErrorResponse): any {
    return error.message || error.toString();
  }

  private getMessageFromResponse(error: HttpErrorResponse) {
    return `${error.status} - ${error.statusText || ''} @ ${error.url}`;
  }
  private isSecurityError(err: HttpErrorResponse) {
    return (
      err.status === HTTP_STATUS.UNAUTHORIZED ||
      err.status === HTTP_STATUS.AUTHENTICATION_TIMEOUT
    );
  }
}
