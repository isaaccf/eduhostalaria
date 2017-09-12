import { LoggingService } from './analytics.service';
import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  constructor(private loggingService: LoggingService) { }

  handleError(error) {
    const message = this.getMessageFromError(error);
    /* ["stack", "message", "rejection", "promise", "zone", "task"] */
    this.loggingService.sendError(message);
    // Show console error
    throw error;
  }
  private getMessageFromError(error) {
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = this.getMessageFromResponse(error);
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return errMsg;
  }
  private getMessageFromResponse(error) {
    const body = error.json() || '';
    const errMsg = `${error.status} - ${error.statusText || ''} ${body}`;
    return errMsg;
  }

}
