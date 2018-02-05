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
  public showEdition = false;
  public loadedMetadata = false;
  public loadingPanelSchema = {
    loading: true,
    empty: false
  };
  public organizationData: IOrganization;
  public viewSchema: IWidgetSchema;
  public events;
  public eventsSchema;

  constructor(
    private route: ActivatedRoute,
    private me: MeService,
    private organization: OrganizationService,
    private schema: SchemaService) { }

  setSchemas() {
    this.schema.getSchema$('organization').subscribe(s => {
      this.viewSchema = s;
    });
    this.schema.getSchema$('events').subscribe(schema => {
      this.eventsSchema = schema.timeline;
    });
  }

  getEvents(payload) {
    this.me.filterEvents(payload).subscribe((events: any) => {
      if (events) {
        events.forEach((event: any) => {
          if (event.freeSeats === 0 || new Date(event.date) < new Date()) {
            event.status = 'DISABLED';
          }
        });
      }
      this.events = events
      this.eventsSchema.events = this.events;
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

  valueByPath(target, path) {
    return this.schema.valueByPath(target, path);
  }

  onDatesChange(payload) {
    payload.organizationId = this.organizationData._id;
    payload.status = 'ACTIVE';
    this.getEvents(payload);
  }
}
