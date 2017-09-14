import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ITimelineSchema, ILoadEmptyStateSchema, IAction } from 'app/tools/schema.model';
import { IUser } from 'app/tools/user.model';
import { SchemaService } from 'app/tools/components/schema.service';

@Component({
  selector: 'ab-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  public isModalActive = false;
  private eventId;
  public formSchema;

  @Input() schema: ITimelineSchema;
  @Output() book = new EventEmitter<any>();

  constructor(private schemaService: SchemaService) { }

  ngOnInit() {
    this.schemaService.getSchema$('book').subscribe(s => {
      this.formSchema = s.form;
    });
  }

  onClick(action) {
    this.eventId = action.value;
    this.isModalActive = true;
  }

  onCloseModal() {
    this.isModalActive = false;
  }

  onSubmit(event) {
    this.book.emit({ eventId: this.eventId, comments: event.comments })
  }
}
