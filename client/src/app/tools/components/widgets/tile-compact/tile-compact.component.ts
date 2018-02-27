import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ab-tile-compact',
  templateUrl: './tile-compact.component.html',
  styleUrls: ['./tile-compact.component.css']
})
export class TileCompactComponent implements OnInit {

  @Input() image: { url: string, name: string, showName: string };
  @Input() link?= true;

  @Output() clicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onClick(fileName) {
    this.clicked.emit(fileName);
  }
}
