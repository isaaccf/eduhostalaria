import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ITimelineSchema, ILoadEmptyStateSchema, IAction } from 'app/tools/schema.model';
import { IUser } from 'app/tools/user.model';
import { SchemaService } from 'app/tools/components/schema.service';
import { SecurityService } from 'app/tools/security.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ab-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit, OnChanges {

  private eventId;
  public selEvent;
  public bookingformSchema;
  public registerFormSchema;

  @Input() schema: ITimelineSchema;
  @Output() book = new EventEmitter<any>();
  @Output() register = new EventEmitter<any>();

  constructor(
    private schemaService: SchemaService,
    private security: SecurityService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.schemaService.getSchema$('book').subscribe(s => {
      this.bookingformSchema = s.user;
      this.registerFormSchema = s.guest;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.schema.currentValue) {
      this.schema.events.map(event => {
        if (event.thumbnail) {
          const url = `data:${event.thumbnail.type};base64, ${event.thumbnail.content}`;

          event.thumbnail = this.sanitizer.bypassSecurityTrustUrl(url);
        }
      });
    }
  }

}
