import { Injectable } from '@angular/core';
import { IMessage } from 'app/tools/message.model';
import { BusService } from 'app/tools/bus.service';
import { IEvent } from 'app/tools/schema.model';

@Injectable()
export class MessagesService {
  private icons = [
    'icon-minus',
    'icon-check',
    'icon-search',
    'icon-stop'
  ]
  private classes = [
    'primary',
    'success',
    'warning',
    'error'
  ]
  constructor(private bus: BusService) {
    this.bus
      .getMessage$()
      .subscribe(message => this.saveMessage(message));
  }

  saveMessage(message: IMessage) {
    message.timestamp = new Date();
    let messages = JSON.parse(localStorage.getItem('messages'));
    if (!messages) {
      messages = [];
    }
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
  }

  populateEventsFromMessages() {
    const events = [];
    const messages: IMessage[] = JSON.parse(localStorage.getItem('messages'));
    if (messages) {
      messages.reverse().forEach((message: IMessage) => {
        const event: IEvent = {
          label: '',
          date: message.timestamp,
          icon: this.icons[message.level],
          items: [
            {
              header: {
                title: message.text
              }
            }
          ]
        }
        events.push(event);
      });
    }
    return events;
  }

  getClassByLevel(level) {
    return this.classes[level];
  }
}
