import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BusService } from 'app/tools/bus.service';
import { SchemaService } from 'app/tools/components/schema.service';
import { IWidgetSchema } from 'app/tools/schema.model';
import { SecurityService } from 'app/tools/security.service';
import { MeService } from 'app/views/me/me.service';
import { OrganizationService } from 'app/views/organization/organization.service';
import { Level } from '../../../tools/message.model';

const TWO_DAYS = 2;

@Component({
  selector: 'ab-events-ushier',
  templateUrl: './events-ushier.component.html',
  styleUrls: ['./events-ushier.component.css']
})
export class EventsUshierComponent implements OnInit {

  public selectedEventId: string;
  public selectedBooking;
  public selectForm: FormGroup;
  public events: any[];
  public bookings: any[];
  public panelSchema: IWidgetSchema = {};
  public actionSchema: IWidgetSchema;
  public reportSchema: any;
  public organization;
  public editorTitle = '';
  public showCommentsModal = false;
  public observationForm: FormGroup;

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
    this.observationForm = this.fb.group({
      observation: ['', Validators.required]
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

    startDate.setDate(startDate.getDate() - TWO_DAYS);
    endingDate.setDate(endingDate.getDate() + TWO_DAYS);

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

    if (action.key === 'comments') {
      this.selectedBooking = action.value;
      this.observation.setValue(this.selectedBooking.observation);
      this.showCommentsModal = true;
    } else {
      this.me.changeBookingStatus(action.value, status).subscribe((booking: any) => {
        this.getBookings(this.selectedEventId);
      });
    }
  }

  onAddComment() {
    this.selectedBooking.observation = this.observation.value;
    this.me.updateBooking(this.selectedBooking).subscribe(
      (res: any) => {
        this.bus.emit({ level: Level.SUCCESS, text: 'Observacións gardadas con éxito', code: '' });
        this.selectedBooking = res;
        this.showCommentsModal = false;
      }
    )
  }

  get observation() {
    return this.observationForm.get('observation');
  }

}
