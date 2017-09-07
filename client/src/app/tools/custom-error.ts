import { LoggingService } from './analytics.service';
import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  constructor(private loggingService: LoggingService) { }

  handleError(error) {
    const message = error.message ? error.message : error.toString();
    /* ["stack", "message", "rejection", "promise", "zone", "task"] */
    this.loggingService.sendError(message);
    // Show console error
    throw error;
  }
}
