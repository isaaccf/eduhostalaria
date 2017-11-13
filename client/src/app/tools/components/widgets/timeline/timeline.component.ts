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
    this.checkEventStatus();
  }

  checkEventStatus() {
    this.schema.events.forEach(event => {
      if (event.freeSeats === 0 || new Date(event.date) < new Date()) {
        event.status = 'CANCELED';
      }
    });
  }

}
