import { Injectable } from '@angular/core';

declare var ga: Function;

@Injectable()
export class LoggingService {
  public sendError(message, data) {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Client.Error.Js',
      eventAction: message,
      eventLabel: data
    });
  }
  public sendEvent(category, message, data) {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Client.' + category,
      eventAction: message,
      eventLabel: data
    });
  }
}
