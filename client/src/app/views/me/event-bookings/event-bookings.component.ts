import { Component, OnInit } from '@angular/core';
import { SchemaService } from 'app/tools/components/schema.service';
import { ActivatedRoute } from '@angular/router';
import { MeService } from 'app/views/me/me.service';

@Component({
  selector: 'ab-event-bookings',
  templateUrl: './event-bookings.component.html',
  styles: []
})
export class EventBookingsComponent implements OnInit {

  public schema;
  public cardSchema;
  public bookings;
  public event;
  public eventSlug;

  constructor(
    private route: ActivatedRoute,
    private me: MeService,
    private schemaService: SchemaService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventSlug = params['slug'];
      this.schemaService.getSchema$('me_event_bookings').subscribe(schema => {
        this.schema = schema;
        this.cardSchema = { header: { title: '' }, fields: this.schema.report.fields };
        this.getEvent();
      });
    });
  }

  getEvent() {
    this.me.getEventBySlug(this.eventSlug).subscribe(event => {
      this.event = event[0];
      this.schema.actions.actions[0].link = '/me/events-ushier/' + this.event.slug + '/bookings';
      this.populateEventInfo();
      this.getBookings();
    });
  };

  getBookings() {
    this.me.getBookingsByEventId(this.event._id).subscribe(bookings => {
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
    if (action.key === 'activate') {
      this.me.changeBookingStatus(action.value, 'ACTIVE').subscribe(() => {
        this.getBookings();
      });
    }
  }

  onDelete(action) {
    this.me.changeBookingStatus(action, 'CANCELED').subscribe(() => {
      this.getBookings();
    });
  }

}
