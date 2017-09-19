import { Component, OnInit } from '@angular/core';
import { SchemaService } from 'app/tools/components/schema.service';
import { IWidgetSchema, IFormSchema, IReportSchema } from 'app/tools/schema.model';
import { BusService } from 'app/tools/bus.service';
import { MeService } from 'app/views/me/me.service';
import { SecurityService } from 'app/tools/security.service';
import { IUser } from 'app/tools/user.model';
import { IOrganization } from 'app/tools/organization.model';
import { Level } from 'app/tools/message.model';

@Component({
  selector: 'ab-events',
  templateUrl: './events.component.html',
  styles: []
})
export class EventsComponent implements OnInit {

  public organization: IOrganization;
  public events: any[];
  public panelSchema: IWidgetSchema = {};
  public actionSchema: IWidgetSchema;
  public createFormSchema: IFormSchema;
  public reportSchema: IReportSchema;
  public cardSchema: IWidgetSchema;
  public showEditModal = false;

  constructor(private schema: SchemaService,
    private me: MeService,
    private security: SecurityService,
    private bus: BusService) { }

  ngOnInit() {
    this.organization = this.security.getLocalOrganization();
    this.getSchema();
    this.getEvents();
  }

  getSchema() {
    this.schema
      .getSchema$('me_events')
      .subscribe(schemas => {
        this.actionSchema = schemas.actions;
        this.createFormSchema = schemas.create;
        this.reportSchema = schemas.report;
        this.schema.populateDefaultValues(this.createFormSchema, this.organization);
        this.cardSchema = { header: { title: '' }, fields: this.createFormSchema.controls };
      });
  }

  getEvents() {
    this.me.getEvents().subscribe(events => {
      this.events = events;
    });
  }

  onCreate(data) {
    this.transformDate(data);
    this.me.postEvent(data).subscribe(events => {
      this.bus.emit({ level: Level.SUCCESS, text: 'Oferta creada con éxito', code: '' });
      this.getEvents();
    });
  }

  transformDate(event) {
    const dateArr = event.date.split('-');
    const year = dateArr[0];
    const month = dateArr[1] - 1;
    const day = dateArr[2];
    let hour = 12;
    event.date = new Date(year, month, day, hour, 0, 0, 0);
    if (event.shift === 'Diurno') {
      hour = 14;
    } else {
      hour = 21;
    }
    event['time'] = new Date(year, month, day, hour, 0, 0, 0);
  }

  onRowAction(action) {
    if (action.key === 'edit') {
      this.showEditModal = true;
    }
  }

  onCloseModal() {
    this.showEditModal = false;
  }

  onEdit(event) {

  }

  onDelete(event) {
    this.me.removeEvent(event._id).subscribe(() => {
      this.bus.emit({ level: Level.SUCCESS, text: 'Oferta eliminada con éxito', code: '' });
      this.getEvents();
    });
  }

}
