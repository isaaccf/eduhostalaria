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
  public booking;
  public bookings;
  public event;
  public eventId;
  public showModal = false;

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
    this.me.getBookingsByUserId().subscribe(bookings => {
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

  onRowAction(event) {
    this.booking = event.value;
    if (event.key === 'edit') {
      this.schemaService.populateDefaultValues(this.schema.editForm, this.booking);
      this.showModal = true;
    }
  }

  onEdit(data) {
    this.booking.comments = data.comments;
    this.me.editBooking(this.booking).subscribe(r => {
      this.getBookings();
      this.showModal = false;
      this.bus.emit({ level: Level.SUCCESS, text: 'Reserva editada con éxito', code: '' });
    });
  }

  onDelete(action) {
    delete action.event;
    this.me.changeBookingStatus(action, 'CANCELED').subscribe(() => {
      this.getBookings();
    });
  }

}
