import { Component, OnInit } from '@angular/core';
import { IWidgetSchema, IReportSchema } from 'app/tools/schema.model';
import { SchemaService } from 'app/tools/components/schema.service';
import { MeService } from 'app/views/me/me.service';
import { SecurityService } from 'app/tools/security.service';
import { Router } from '@angular/router';
import { BusService } from 'app/tools/bus.service';
import { OrganizationService } from 'app/views/organization/organization.service';

@Component({
  selector: 'ab-events-ushier',
  templateUrl: './events-ushier.component.html',
  styles: []
})
export class EventsUshierComponent implements OnInit {

  public events: any[];
  public panelSchema: IWidgetSchema = {};
  public actionSchema: IWidgetSchema;
  public reportSchema: IReportSchema;
  public cardSchema: IWidgetSchema;
  public organization;

  constructor(private schema: SchemaService,
    private orgService: OrganizationService,
    private router: Router,
    private me: MeService,
    private security: SecurityService,
    private bus: BusService) { }

  ngOnInit() {
    this.getSchema();
  }

  getSchema() {
    this.schema
      .getSchema$('me_events_ushier')
      .subscribe(schemas => {
        this.actionSchema = schemas.actions;
        this.reportSchema = schemas.report;
        this.cardSchema = { header: { title: '' }, fields: this.reportSchema.fields };
        this.getEvents();
      });
  }

  getEvents() {
    this.organization = this.security.getLocalOrganization();
    this.me.filterEvents({ organizationId: this.organization._id })
      .map((events: any) => events.filter(event => event.status !== 'CANCELED'))
      .subscribe((events: any) => {
        this.events = events;
      });
  }

  onFilter(payload) {
    payload.status = 'active';
    this.me.filterEvents(payload).subscribe((events: any[]) => {
      this.events = events;
    });
  }
}
