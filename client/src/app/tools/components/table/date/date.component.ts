import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ab-date',
  templateUrl: './date.component.html',
  styles: []
})
export class DateComponent implements OnInit {

  @Input() date: any;
  @Input() format?: any;

  constructor() { }

  ngOnInit() {
  }

}
