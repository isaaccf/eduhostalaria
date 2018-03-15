import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IFormSchema, IWidgetSchema, ITimelineSchema } from 'app/tools/schema.model';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { IOrganization, OrganizationService, IEvent } from 'app/views/organization/organization.service';
import { SchemaService } from 'app/tools/components/schema.service';
import { SecurityService } from 'app/tools/security.service';
import { MeService } from 'app/views/me/me.service';
import { IUser } from 'app/tools/user.model';
import { BusService } from 'app/tools/bus.service';
import { Level } from 'app/tools/message.model';
import { Options } from 'fullcalendar';
import { CalendarComponent } from 'ng-fullcalendar';

@Component({
  selector: 'ab-organization-home',
  templateUrl: './organization-home.component.html',
  styleUrls: ['./organization-home.component.css']
})
export class OrganizationHomeComponent implements OnInit {

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  @ViewChild('selectedEventSection') selectedEventSection: ElementRef;

  public showEdition = false;
  public loadedMetadata = false;
  public loadingPanelSchema = {
    loading: true,
    empty: false
  };
  public organizationData: IOrganization;
  public viewSchema: IWidgetSchema;
  public eventsSchema;
  public events;
  public shownEvents = [];
  public calendarOptions: Options = {
    locale: 'es',
    editable: false,
    eventLimit: false,
    header: {
      left: 'prev,next',
      center: 'title',
      right: 'today'
    },
    buttonText: {
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Día',
      list: 'list'
    },
    selectable: true,
    events: [],
  };
  public selectedEvents: any;

  constructor(
    private route: ActivatedRoute,
    private me: MeService,
    private organization: OrganizationService,
    private schema: SchemaService) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        const slug = params['slug'];
        this.organization
          .getOrganizationBySlug(slug)
          .subscribe(organization => {
            this.organizationData = organization;
            if (this.organizationData) {
              this.setSchemas();
              this.getEvents();
            } else {
              this.loadingPanelSchema.loading = false;
              this.loadedMetadata = true;
              this.loadingPanelSchema.empty = true;
            }
          });
      });
  }

  setSchemas() {
    this.schema.getSchema$('organization').subscribe(schema => {
      this.viewSchema = schema;
    });
    this.schema.getSchema$('events').subscribe(schema => {
      this.eventsSchema = schema.timeline;
    });
  }

  getEvents() {
    const payload = { status: 'ACTIVE', organizationId: this.organizationData._id }

    this.me.filterEvents(payload).subscribe((events: any) => {
      if (events) {
        events.forEach((event: any) => {
          if (event.freeSeats === 0 || new Date(`${event.date.split('T')[0]}T${event.startTime}`) < new Date()) {
            event.status = 'DISABLED';
          }
        });
        this.events = events;
        this.setCalendarEvents();
      }
    });
  }

  setCalendarEvents() {
    this.events
      .filter(event => event.status !== 'DISABLED')
      .map(event => {
        const shownEvents = this.shownEvents.filter(shownEvent => {
          return shownEvent.start.split('T')[0] === event.date.split('T')[0];
        })

        if (!shownEvents.length) {
          this.shownEvents.push({
            title: 'Ver eventos',
            start: `${event.date.split('T')[0]}T${event.startTime}:00.000Z`,
            ending: `${event.date.split('T')[0]}T${event.endTime}:00.000Z`,
            allDay: true
          });
        }
      });
  }

  valueByPath(target, path) {
    return this.schema.valueByPath(target, path);
  }

  onEventClick(data: any) {
    const payload = {
      organizationId: this.organizationData._id,
      startDate: `${data.event.ending.split('T')[0]}T0:00:00.000Z`,
      endingDate: `${data.event.ending.split('T')[0]}T23:59:59.999Z`,
    }

    this.me.filterEvents(payload).subscribe(
      (events: any) => {
        this.selectedEvents = events;
        this.selectedEventSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    )
  }

}
