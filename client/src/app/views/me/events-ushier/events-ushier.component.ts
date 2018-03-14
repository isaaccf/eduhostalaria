import { Component, OnInit, SimpleChanges } from '@angular/core';
import { IWidgetSchema, IReportSchema } from 'app/tools/schema.model';
import { SchemaService } from 'app/tools/components/schema.service';
import { MeService } from 'app/views/me/me.service';
import { SecurityService } from 'app/tools/security.service';
import { Router } from '@angular/router';
import { BusService } from 'app/tools/bus.service';
import { OrganizationService } from 'app/views/organization/organization.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ab-events-ushier',
  templateUrl: './events-ushier.component.html',
  styleUrls: ['./events-ushier.component.css']
})
export class EventsUshierComponent implements OnInit {

  public selectedEventId: string;
  public selectForm: FormGroup;
  public events: any[];
  public bookings: any[];
  public panelSchema: IWidgetSchema = {};
  public actionSchema: IWidgetSchema;
  public reportSchema: any;
  public organization;
  public editorTitle = '';

  constructor(
    private fb: FormBuilder,
    private schema: SchemaService,
    private orgService: OrganizationService,
    private router: Router,
    private me: MeService,
    private security: SecurityService,
    private bus: BusService
  ) { }

  ngOnInit() {
    this.getSchema();
    this.createForm();
  }

  getSchema() {
    this.schema
      .getSchema$('me_events_ushier')
      .subscribe(schemas => {
        this.actionSchema = schemas.actions;
        this.reportSchema = schemas.report;
        this.getEvents();
      });
  }

  createForm() {
    this.selectForm = this.fb.group({
      event: ['']
    });
    this.onChanges();
  }

  onChanges() {
    this.selectForm.get('event').valueChanges.subscribe(
      (eventId: string) => {
        this.getBookings(eventId);
        this.selectedEventId = eventId;
        this.editorTitle = this.events.filter(event => event._id === eventId)[0].name;
      }
    )
  }

  getEvents() {
    this.organization = this.security.getLocalOrganization();

    const startDate = new Date();
    const endingDate = new Date();

    startDate.setDate(startDate.getDate() - 2);
    endingDate.setDate(endingDate.getDate() + 2);

    const payload = {
      organizationId: this.organization._id,
      status: 'active',
      startDate: startDate.toISOString().split('T')[0],
      endingDate: endingDate.toISOString().split('T')[0]
    };

    this.me.filterEvents(payload)
      .subscribe((events: any) => {
        this.events = events;
      });
  }

  getBookings(eventId) {
    this.me.getBookingsByEventIdAndNotStatus(eventId, 'CANCELED').subscribe(
      (bookings: any) => {
        this.bookings = bookings;
      });
  }

  onRowAction(action) {
    const status = action.key.toUpperCase();

    this.me.changeBookingStatus(action.value, status).subscribe((booking: any) => {
      this.getBookings(this.selectedEventId);
    });
  }

}
