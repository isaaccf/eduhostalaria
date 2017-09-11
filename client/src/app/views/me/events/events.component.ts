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
        this.populateDateSelect();
      });
  }

  getEvents() {
    this.me.getEvents().subscribe(events => {
      this.events = events;
    });
  }

  populateDateSelect() {
    const labels = [];
    const currDate = new Date();

    currDate.setDate(currDate.getDate() + 6);

    for (let i = 0; i < 5; i++) {
      let label = '';

      currDate.setDate(currDate.getDate() + 1);
      label += this.getNameOfDay(currDate.getDay()) + ' ' + (currDate.getUTCDate());
      this.getDayTextByTurn(label).forEach(el => {
        labels.push(el);
      });
    }
    this.createFormSchema.controls[0].actions = labels;
  }

  getDayTextByTurn(label: string) {
    const labels = [];
    const options = ['Comida', 'Cena'];

    for (let j = 0; j < 2; j++) {
      labels.push({
        label: label + ' ' + options[j]
      });
    }

    return labels;
  }

  getNameOfDay(day: number) {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    return days[day];
  }

  onCreate(data) {
    console.log('creating event: ', data);
    this.me.postEvent(data).subscribe(events => {
      this.getEvents();
    });
  }

  onRowAction(event) {

  }

  onDelete(event) {

  }

}
