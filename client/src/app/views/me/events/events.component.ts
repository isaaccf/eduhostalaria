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
      console.log(events);
    });
  }

  onCreate(data) {
    this.transformDate(data);

    this.security.getMe().subscribe((user: IUser) => {
      this.me.getAdministratedOrganization(user.organizationId)
        .subscribe((org: IOrganization) => {
          data['standardPrice'] = org.standardPrice;
          data['reducedePrice'] = org.reducedPrice;
          data['capacity'] = org.capacity;
          data['capacity2'] = org.capacity2;
          this.me.postEvent(data).subscribe(events => {
            this.bus.emit({ level: Level.SUCCESS, text: 'Oferta creada con éxito', code: '' });
            this.getEvents();
          });
        });
    });
  }

  transformDate(data) {
    const dateArr = data.date.split('-');
    let hour;

    dateArr[1] -= 1;

    data.date = new Date(dateArr[0], dateArr[1], dateArr[2], 12, 0, 0, 0);

    if (data.shift === 'Diurno') {
      hour = 14;
    } else {
      hour = 21;
    }
    data['time'] = new Date(dateArr[0], dateArr[1], dateArr[2], hour, 0, 0, 0);
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
