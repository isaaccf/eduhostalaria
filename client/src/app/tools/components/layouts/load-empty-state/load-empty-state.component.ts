import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ILoadEmptyStateSchema } from 'app/tools/schema.model';

@Component({
  selector: 'ab-load-empty-state',
  templateUrl: './load-empty-state.component.html',
  styleUrls: ['./load-empty-state.component.css']
})
export class LoadEmptyStateComponent implements OnInit {

  @Input() schema: ILoadEmptyStateSchema;
  @Output() action = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.action.emit(this.schema.action.value);
  }
}
