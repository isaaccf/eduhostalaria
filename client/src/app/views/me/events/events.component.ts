import { Component, OnInit } from '@angular/core';
import { SchemaService } from 'app/tools/components/schema.service';
import { IWidgetSchema, IFormSchema } from 'app/tools/schema.model';
import { BusService } from 'app/tools/bus.service';
import { MeService } from 'app/views/me/me.service';

@Component({
  selector: 'ab-events',
  templateUrl: './events.component.html',
  styles: []
})
export class EventsComponent implements OnInit {

  public panelSchema: IWidgetSchema = {};
  public actionSchema: IWidgetSchema;
  public createFormSchema: IFormSchema;
  public createModalActive = false;

  constructor(private schema: SchemaService, private me: MeService) { }

  ngOnInit() {
    this.schema
      .getSchema$('me_events')
      .subscribe(schemas => {
        this.actionSchema = schemas.actions;
        this.createFormSchema = schemas.create;
      });
  }

  onAction() {
    this.createModalActive = true;
  }

  onCreate(data) {
    console.log('creating event: ', data);
    this.me.postEvent(data).subscribe();
    this.createModalActive = false;
  }

  onCancelCreate() {
    this.createModalActive = false;
  }

}
