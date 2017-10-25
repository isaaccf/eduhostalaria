import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/takeWhile';
import { BusService } from 'app/tools/bus.service';
import { MessagesService } from 'app/tools/messages.service';
import { SchemaService } from 'app/tools/components/schema.service';
@Component({
  selector: 'ab-messages',
  templateUrl: './messages.component.html',
  styles: []
})
export class MessagesComponent implements OnInit {
  public schemas;

  constructor(
    private bus: BusService,
    private messages: MessagesService,
    private schema: SchemaService) { }

  ngOnInit() {
    this.schema
      .getSchema$('messages')
      .subscribe(schema => {
        this.schemas = schema;
        this.schemas.timeline.events = this.messages.populateEventsFromMessages();
      });
  }

}
