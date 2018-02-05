import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeService } from 'app/views/me/me.service';
import { SchemaService } from 'app/tools/components/schema.service';
import { FormToolsService } from 'app/tools/components/forms/form-tools.service';
import { BusService } from 'app/tools/bus.service';
import { Level } from 'app/tools/message.model';

@Component({
  selector: 'ab-bookings',
  templateUrl: './bookings.component.html',
  styles: []
})
export class BookingsComponent implements OnInit {

  public schema;
  public cardSchema;
  public bookings;
  public eventId;

  constructor(
    private bus: BusService,
    private route: ActivatedRoute,
    private me: MeService,
    private schemaService: SchemaService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventId = params['eventId'];
      this.schemaService.getSchema$('me_bookings').subscribe(schema => {
        this.schema = schema;
        this.cardSchema = { header: { title: '' }, fields: this.schema.report.fields };
        this.getBookings();
      });
    });
  }

  getBookings() {
    this.me.getBookingsByUserId()
      .map((bookings: any) => {
        return bookings.filter(booking => booking.status !== 'CANCELED');
      })
      .subscribe(bookings => {
        this.bookings = bookings;
      });
  }

}
