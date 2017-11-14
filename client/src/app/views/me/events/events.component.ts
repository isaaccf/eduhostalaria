import { Component, OnInit } from '@angular/core';
import { SchemaService } from 'app/tools/components/schema.service';
import { IWidgetSchema, IFormSchema, IReportSchema } from 'app/tools/schema.model';
import { BusService } from 'app/tools/bus.service';
import { MeService } from 'app/views/me/me.service';
import { SecurityService } from 'app/tools/security.service';
import { IUser } from 'app/tools/user.model';
import { IOrganization } from 'app/tools/organization.model';
import { Level } from 'app/tools/message.model';
import { Router } from '@angular/router';

@Component({
  selector: 'ab-events',
  templateUrl: './events.component.html',
  styles: []
})
export class EventsComponent implements OnInit {

  private organizationId;
  public events: any[];
  public panelSchema: IWidgetSchema = {};
  public actionSchema: IWidgetSchema;
  public reportSchema: IReportSchema;
  public cardSchema: IWidgetSchema;

  constructor(private schema: SchemaService,
    private me: MeService,
    private router: Router,
    private security: SecurityService,
    private bus: BusService) { }

  ngOnInit() {
    this.getSchema();
    this.getEvents();
  }

  getSchema() {
    this.schema
      .getSchema$('me_events')
      .subscribe(schemas => {
        this.actionSchema = schemas.actions;
        this.reportSchema = schemas.report;
        this.cardSchema = { header: { title: '' }, fields: this.reportSchema.fields };
      });
  }

  getEvents() {
    const organizationId = this.security.getLocalOrganization()._id;
    this.me.filterEvents({ organizationId }).subscribe((events: any) => {
      this.events = events;
    });
  }

  onRowAction(action) {
    const event = Object.assign({}, action.value);

    switch (action.key) {
      case 'edit':
        this.router.navigateByUrl(`me/events/${event._id}`);
        break;
      case 'activate':
        this.me.changeEventStatus(event, 'ACTIVE').subscribe(() => {
          this.getEvents();
        });
        break;
      case 'deactivate':
        this.me.changeEventStatus(event, 'DISABLED').subscribe(() => {
          this.getEvents();
        });
        break;
    }
  }

  onDelete(event) {
    this.me.changeEventStatus(event, 'CANCELED').subscribe(() => {
      this.getEvents();
    });
  }

  onFilter(payload) {
    this.me.filterEvents(payload).subscribe((events: any[]) => {
      this.events = events;
    });
  }
}
