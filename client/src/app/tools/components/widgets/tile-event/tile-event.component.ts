import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ab-tile-event',
  templateUrl: './tile-event.component.html',
  styleUrls: ['./tile-event.component.css']
})
export class TileEventComponent implements OnInit {

  @Input() event: any;

  constructor() { }

  ngOnInit() {
  }

}
