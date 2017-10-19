import { Component, OnInit } from '@angular/core';
import { MeService } from 'app/views/me/me.service';
import { SchemaService } from 'app/tools/components/schema.service';
import { ActivatedRoute } from '@angular/router';
import { BusService } from 'app/tools/bus.service';
import { Level } from 'app/tools/message.model';

@Component({
  selector: 'ab-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  public schema;
  public cardSchema;
  public bookingId;
  public booking;
  public showEditModal = false;
  public showCancelModal = false;
  public showRateModal = false;

  constructor(
    private bus: BusService,
    private route: ActivatedRoute,
    private me: MeService,
    private schemaService: SchemaService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bookingId = params['bookingId'];
      this.schemaService.getSchema$('me_booking').subscribe(schema => {
        this.schema = schema;
        this.cardSchema = { header: { title: '' }, fields: this.schema.fields };
        this.getBooking();
      });
    });
  }

  getBooking() {
    this.me.getBooking(this.bookingId).subscribe(booking => {
      console.log(booking);
      this.booking = booking;
      this.schema.actions.header.title += (' para ' + this.booking.event.name);
      this.schemaService.populateDefaultValues(this.schema.editForm, this.booking);
    });
  }

  onShowEditModal() {
    this.showEditModal = true;
  }

  onShowCancelModal() {
    this.showCancelModal = true;
  }

  onShowRateModal() {
    this.showRateModal = true;
  }

  onEdit(data) {
    const bookingTemp = Object.assign({}, this.booking);
    bookingTemp.comments = data.comments;
    bookingTemp.eventId = this.booking.event._id;
    delete bookingTemp.event;
    this.me.editBooking(bookingTemp).subscribe(booking => {
      this.getBooking();
      this.showEditModal = false;
      this.bus.emit({ level: Level.SUCCESS, text: 'Reserva editada con éxito', code: '' });
    });
  }

  onDelete() {
    const bookingTemp = Object.assign({}, this.booking);
    bookingTemp.eventId = this.booking.event._id;
    delete bookingTemp.event;
    this.me.changeBookingStatus(bookingTemp, 'CANCELED').subscribe(() => {
      this.getBooking();
      this.showCancelModal = false;
      this.bus.emit({ level: Level.SUCCESS, text: 'Reserva cancelada con éxito', code: '' });
    });
  }

  onRate(payload) {
    this.me.rateBooking(this.bookingId, payload).subscribe(booking => {
      this.booking = booking;
      this.showRateModal = false;
      this.bus.emit({ level: Level.SUCCESS, text: 'Valoración enviada con éxito', code: '' });
    });
  }

}
