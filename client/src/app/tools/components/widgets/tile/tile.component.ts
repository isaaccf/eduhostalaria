import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IWidgetSchema, IKeyValue } from 'app/tools/schema.model';

@Component({
  selector: 'ab-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  @Input() schema: IWidgetSchema;
  @Output() send = new EventEmitter<IKeyValue>();

  constructor() { }

  ngOnInit() {
  }

  onClick(keyValue) {
    this.send.emit(keyValue);
  }
}
