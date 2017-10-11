import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ab-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.css']
})
export class PillComponent implements OnInit {

  @Input() text: any;
  @Input() link?: string;

  constructor() { }

  ngOnInit() {
  }

  getClass(value: string) {
    switch (this.text) {
      case 'ACTIVE':
        return 'label-success';
      case 'PENDING':
        return 'label-warning';
      case 'CANCELED':
        return 'label-grey';
      case 'DISABLED':
        return 'label-error';
      default:
        return 'label-primary';
    }
  }

}
