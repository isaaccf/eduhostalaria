import { Injectable } from '@angular/core';
import { IMessage } from 'app/tools/message.model';

import { IEvent } from 'app/tools/schema.model';
import { SchemaService } from 'app/tools/components/schema.service';

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
  private texts: any[];
  constructor(private schema: SchemaService) {
    this.schema
      .getSchema$('messages')
      .subscribe(s => {
        this.texts = s.texts;
      });
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

  getUserText(message: IMessage) {
    if (!message.text) {
      message.text = '';
    }
    if (message.code !== undefined) {
      const text = this.getTextByCode(message.code.toString());
      return message.text + ' ' + text;
    }
    return message.text;
  }

  getTextByCode(code: string): string {
    let userMessage;
    userMessage = this.texts.find(t => t.code.toString() === code);
    if (!userMessage) {
      if (code.startsWith('4')) {
        userMessage = this.texts.find(t => t.code.toString() === '40X');
      } else if (code.startsWith('5')) {
        userMessage = this.texts.find(t => t.code.toString() === '50X');
      }
    }
    if (userMessage) {
      return userMessage.text;
    } else {
      return '';
    }
  }
}
