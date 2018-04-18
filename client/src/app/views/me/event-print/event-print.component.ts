import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { BusService } from '../../../tools/bus.service';
import { MeService } from '../me.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'ab-event-print',
  templateUrl: './event-print.component.html',
  styles: []
})
export class EventPrintComponent implements OnInit {

  public event: any;
  public bookings: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private busService: BusService,
    private meService: MeService
  ) { }

  ngOnInit() {
    this.busService.emitIsPrintingMode(true);
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getEvent(params.id);
      this.getBookings(params.id);
    });
  }

  getEvent(eventId: string) {
    this.meService.getEventById(eventId).subscribe(
      (event) => {
        this.event = event;
      }
    )
  }

  getBookings(eventId) {
    this.meService.getBookingsByEventId(eventId).subscribe(
      (bookings) => {
        this.bookings = bookings;
      }
    )
  }

}
