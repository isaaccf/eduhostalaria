import { Component, OnInit, AfterViewInit, AfterViewChecked, Inject } from '@angular/core';
import { BusService } from '../../../tools/bus.service';
import { MeService } from '../me.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SecurityService } from '../../../tools/security.service';
import { map } from 'rxjs/operators';

declare var window: any;

@Component({
  selector: 'ab-event-print',
  templateUrl: './event-print.component.html',
  styleUrls: ['./event-print.component.css']
})
export class EventPrintComponent implements OnInit {

  public event: any;
  public bookings: any;
  public organization: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private busService: BusService,
    private meService: MeService,
    private securityService: SecurityService,
    private router: Router
  ) { }

  ngOnInit() {
    this.busService.emitIsPrintingMode(true);
    this.getOrganization();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getEvent(params.id);
      this.getBookings(params.id);
    });
  }

  getOrganization() {
    this.organization = this.securityService.getLocalOrganization();
  }

  getEvent(eventId: string) {
    this.meService.getEventById(eventId).subscribe(
      (event) => {
        this.event = event;
      }
    )
  }

  getBookings(eventId) {
    this.meService.getBookingsByEventId(eventId)
      .pipe(
        map((bookings: any) => {
          return bookings.sort((a, b) => {
            return a.name > b.name;
          });
        })
      ).subscribe(
        (bookings) => {
          this.bookings = bookings;
        }
      )
  }

  onNavigateToHome() {
    this.busService.emitIsPrintingMode(false);
    this.router.navigateByUrl('');
  }

  onPrint() {
    window.print();
  }

}
