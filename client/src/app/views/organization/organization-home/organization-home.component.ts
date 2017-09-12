import { Component, OnInit } from '@angular/core';
import { IFormSchema, IWidgetSchema, ITimelineSchema } from 'app/tools/schema.model';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { IOrganization, OrganizationService, IEvent } from 'app/views/organization/organization.service';
import { SchemaService } from 'app/tools/components/schema.service';

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
    private organization: OrganizationService,
    private schema: SchemaService,
    private location: Location) { }

  setSchemas() {
    this.schema.getSchema$('organization').subscribe(s => {
      this.viewSchema = s;
    });
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
      this.events.reverse().forEach((ev: IEvent) => {
        const event = {
          label: ev.name,
          date: ev.date,
          icon: '',
          items: [
            {
              header: {
                title: ev.description
              }
            }
          ],
          action: {
            label: 'Reservar'
          }
        }
        events.push(event);
      });
    }
    return events;
  }

}
