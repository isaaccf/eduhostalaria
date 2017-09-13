import { Component, OnInit } from '@angular/core';
import { SchemaService } from 'app/tools/components/schema.service';
import { IWidgetSchema, IFormSchema, IReportSchema } from 'app/tools/schema.model';
import { BusService } from 'app/tools/bus.service';
import { MeService } from 'app/views/me/me.service';

@Component({
  selector: 'ab-events',
  templateUrl: './events.component.html',
  styles: []
})
export class EventsComponent implements OnInit {

  public events: any[];
  public panelSchema: IWidgetSchema = {};
  public actionSchema: IWidgetSchema;
  public createFormSchema: IFormSchema;
  public reportSchema: IReportSchema;
  public cardSchema: IWidgetSchema;

  constructor(private schema: SchemaService, private me: MeService) { }

  ngOnInit() {
    this.schema
      .getSchema$('me_events')
      .subscribe(schemas => {
        this.actionSchema = schemas.actions;
        this.createFormSchema = schemas.create;
        this.reportSchema = schemas.report;
        this.cardSchema = { header: { title: '' }, fields: this.createFormSchema.controls };
        this.getEvents();
      });
  }

  getEvents() {
    this.me.getEvents().subscribe(events => {
      this.events = events;
    });
  }

  onCreate(data) {
    if (!data.name) {
      data.name = '';
    }
    // Sumar 12 horas al date
    // Enviar time con fecha + hora
    // Mostrar turno
    if (data.shift === 'diurno') {
      data['time'] = '14:00';
    } else {
      data['time'] = '21:00';
    }
    this.me.postEvent(data).subscribe(events => {
      this.getEvents();
    });
  }

  onRowAction(event) {

  }

  onDelete(event) {

  }

}
