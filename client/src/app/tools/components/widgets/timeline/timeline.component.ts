import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ITimelineSchema, ILoadEmptyStateSchema, IAction } from 'app/tools/schema.model';
import { IUser } from 'app/tools/user.model';
import { SchemaService } from 'app/tools/components/schema.service';
import { SecurityService } from 'app/tools/security.service';

@Component({
  selector: 'ab-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  private eventId;
  public selEvent;
  public bookingformSchema;
  public registerFormSchema;
  public isBookingModalActive = false;
  public isRegisterModalActive = false;

  @Input() schema: ITimelineSchema;
  @Output() book = new EventEmitter<any>();
  @Output() register = new EventEmitter<any>();

  constructor(private schemaService: SchemaService,
    private security: SecurityService) { }

  ngOnInit() {
    this.schemaService.getSchema$('book').subscribe(s => {
      this.bookingformSchema = s.user;
      this.registerFormSchema = s.guest;
    });
  }

  onClick(action) {
    const user: IUser = this.security.getLocalUser();
    this.selEvent = action.value;

    if (user) {
      this.isBookingModalActive = true;
    } else {
      this.isRegisterModalActive = true;
    }
    this.eventId = this.selEvent._id;
  }

  onCloseModal() {
    this.isBookingModalActive = false;
    this.isRegisterModalActive = false;
  }

  onSubmitBooking(event) {
    this.book.emit({ eventId: this.eventId, seats: event.seats, comments: event.comments });
    this.isBookingModalActive = false;
  }

  onSubmitRegister(event) {
    event['eventId'] = this.eventId;
    this.register.emit(event);
    this.isRegisterModalActive = false;
  }

}
