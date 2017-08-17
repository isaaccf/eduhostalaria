import { Component, OnInit, Input } from '@angular/core';
import { ITimelineSchema } from 'app/tools/schema.model';

@Component({
  selector: 'ab-timeline',
  templateUrl: './timeline.component.html',
  styles: []
})
export class TimelineComponent implements OnInit {

  @Input() schema: ITimelineSchema;

  constructor() { }

  ngOnInit() {
  }

  onClick(event) {

  }

}
