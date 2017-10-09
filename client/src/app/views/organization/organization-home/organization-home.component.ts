import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'ab-organization-home',
  templateUrl: './organization-home.component.html',
  styleUrls: ['./organization-home.component.css']
})
export class OrganizationHomeComponent implements OnInit {
  schemaService: any;
  organizationsUrl = 'organizations';
  public showEdition = false;
  loadedMetadata = false;
  loadingPanelSchema = {
    loading: true,
    empty: false
  };
  public organizationData: IOrganization;
  public viewSchema: IWidgetSchema;
  public events: IEvent[];
  public eventsSchema;

  constructor(
    private route: ActivatedRoute,
    private bus: BusService,
    private security: SecurityService,
    private me: MeService,
    private organization: OrganizationService,
    private schema: SchemaService,
    private location: Location) { }

  setSchemas() {
    this.schema.getSchema$('organization').subscribe(s => {
      this.viewSchema = s;
    });
    this.getEvents();
  }

  getEvents() {
    this.schema.getSchema$('events').subscribe(schema => {
      this.eventsSchema = schema.timeline;
      this.organization.getEventsByOrganizationId(this.organizationData._id).subscribe((events: IEvent[]) => {
        this.events = events;
        this.eventsSchema.events = this.populateEvents();
      });
    });
  }

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
            } else {
              this.loadingPanelSchema.loading = false;
              this.loadedMetadata = true;
              this.loadingPanelSchema.empty = true;
            }
          });
      });
  }

  populateEvents() {
    const events = [];
    if (this.events) {
      this.events.reverse().forEach((ev: any) => {
        const event = {
          name: ev.name,
          date: ev.date,
          shift: ev.shift,
          files: ev.files,
          icon: '',
          items: [
            {
              header: {
                title: ev.description
              }
            }
          ],
          action: {
            label: 'Reservar',
            key: 'book',
            value: ev
          }
        }
        events.push(event);
      });
    }
    return events;
  }

  valueByPath(target, path) {
    return this.schema.valueByPath(target, path);
  }

  onBook(payload) {
    this.me.bookEvent(payload).subscribe(d => {
      this.getEvents();
      this.bus.emit({ level: Level.SUCCESS, text: 'Reserva realizada con éxito', code: '' });
    });
  }

  onRegister(payload) {
    payload['organizationId'] = this.organizationData._id;
    this.me.bookEventGuest(payload).subscribe(d => {
      this.getEvents();
      this.bus.emit({ level: Level.SUCCESS, text: 'Reserva realizada e pendente de aprobación', code: '' });
    });
  }

}
