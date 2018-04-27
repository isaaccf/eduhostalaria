import { Component, OnInit } from '@angular/core';
import { SchemaService } from 'app/tools/components/schema.service';
import { IWidgetSchema, IFormSchema, IReportSchema, IAction } from 'app/tools/schema.model';
import { BusService } from 'app/tools/bus.service';
import { MeService } from 'app/views/me/me.service';
import { SecurityService } from 'app/tools/security.service';
import { IUser } from 'app/tools/user.model';
import { IOrganization } from 'app/tools/organization.model';
import { Level } from 'app/tools/message.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ab-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  private organization: IOrganization;
  public selectedEvent;
  public events: any[];
  public filters;
  public panelSchema: IWidgetSchema = {};
  public actionSchema: IWidgetSchema;
  public reportSchema: IReportSchema;
  public cardSchema: IWidgetSchema;

  constructor(private schema: SchemaService,
    private me: MeService,
    private router: Router,
    private security: SecurityService,
    private bus: BusService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getSchema();
  }

  getSchema() {
    this.schema
      .getSchema$('me_events')
      .subscribe(schemas => {
        this.actionSchema = schemas.actions;
        this.reportSchema = schemas.report;
        this.cardSchema = { header: { title: '' }, fields: this.reportSchema.fields };
      });
    this.getOrganization();
  }

  getOrganization() {
    this.organization = this.security.getLocalOrganization();
  }

  onFilter(payload?) {
    let params;

    if (!payload) {
      params = this.filters;
    } else {
      params = payload;
      this.filters = payload;
    }

    this.me.filterEvents(params)
      .map((events: any) => {
        if (events) {
          events.map(event => {
            event.free = event.capacity - event.pax;
            event.time = `De ${event.startTime} a ${event.endTime}`;
            return event;
          })
        }
        return events
      })
      .subscribe((events: any[]) => {
        this.events = events;
      });
  }

  onRowAction(action) {
    const event = Object.assign({}, action.value);

    this.selectedEvent = event;
    console.log('wtf');
    switch (action.key) {
      case 'edit':
        this.router.navigateByUrl(`me/events/${this.selectedEvent._id}`);
        break;
    }
  }

  onDelete(event) {
    this.me.deleteEvent(event._id).subscribe(
      () => {
        this.onFilter();
      }
    )
  }

}
