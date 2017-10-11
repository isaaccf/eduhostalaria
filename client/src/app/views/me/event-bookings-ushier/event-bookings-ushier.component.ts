import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeService } from 'app/views/me/me.service';
import { SchemaService } from 'app/tools/components/schema.service';
import { Level } from 'app/tools/message.model';
import { BusService } from 'app/tools/bus.service';

@Component({
  selector: 'ab-event-bookings-ushier',
  templateUrl: './event-bookings-ushier.component.html',
  styles: []
})
export class EventBookingsUshierComponent implements OnInit {

  public schema;
  public cardSchema;
  public bookings;
  public event;
  public eventSlug;

  constructor(
    private bus: BusService,
    private route: ActivatedRoute,
    private me: MeService,
    private schemaService: SchemaService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventSlug = params['slug'];
      this.schemaService.getSchema$('me_event_bookings_ushier').subscribe(schema => {
        this.schema = schema;
        this.cardSchema = { header: { title: '' }, fields: this.schema.report.fields };
        this.getEvent();
      });
    });
  }

  getEvent() {
    this.me.getEventBySlug(this.eventSlug).subscribe(event => {
      this.event = event[0];
      this.populateEventInfo();
      this.getBookings();
    });
  };

  getBookings() {
    this.me.getBookingsByEventIdAndNotStatus(this.event._id, 'CANCELED').subscribe(bookings => {
      this.bookings = bookings;
    });
  }

  populateEventInfo() {
    if (this.event.name && this.event.name.length > 0) {
      this.schema.actions.header.title = this.schema.actions.header.title + ' - ' + this.event.name;
    }
    this.schema.actions.header.title +=
      ' - ' + new Date(this.event.date).toLocaleString().split(' ')[0]
      + ' ' + this.event.shift;
  }

  onRowAction(action) {
    const status = action.key.toUpperCase();
    this.me.changeBookingStatus(action.value, status).subscribe((booking: any) => {
      this.getBookings();
    });
  }
}
