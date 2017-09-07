import { Injectable } from '@angular/core';

declare var ga: Function;

@Injectable()
export class LoggingService {
  public sendError(message) {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Error',
      eventAction: 'Message',
      eventLabel: message
    })
  }
}
