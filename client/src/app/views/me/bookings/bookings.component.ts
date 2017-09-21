import { Component, OnInit } from '@angular/core';
import { SchemaService } from 'app/tools/components/schema.service';
import { ActivatedRoute } from '@angular/router';
import { MeService } from 'app/views/me/me.service';

@Component({
  selector: 'ab-bookings',
  templateUrl: './bookings.component.html',
  styles: []
})
export class BookingsComponent implements OnInit {

  public schema;
  public bookings;
  public event;
  public eventId;

  constructor(
    private route: ActivatedRoute,
    private me: MeService,
    private schemaService: SchemaService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventId = params['eventId'];
      this.schemaService.getSchema$('me_bookings').subscribe(schema => {
        this.schema = schema;
        this.schema.cardSchema = { header: { title: '' }, fields: '' };
        this.getEvent();
        this.getBookings();
      });
    });
  }

  getEvent() {
    this.me.getEventById(this.eventId).subscribe(event => {
      this.event = event;
      this.populateEventInfo();
      console.log(event);
    });
  };

  getBookings() {
    this.me.getBookingsByEventId(this.eventId).subscribe(bookings => {
      this.bookings = bookings;
      console.log(bookings);
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

  onRowAction(event) {

  }

  onDelete(event) {

  }

}
