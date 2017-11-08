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

  // tslint:disable-next-line:cyclomatic-complexity
  getClass(value: string) {
    switch (this.text) {
      case 'ACTIVE':
        return 'label-success';
      case 'ATTENDED':
        return 'label-warning'
      case 'CANCELED':
        return 'label-error';
      case 'DISABLED':
        return 'label-grey';
      case 'PAID':
        return 'label-secondary';
      case 'PENDING':
        return 'label-warning';
      default:
        return 'label-default';
    }
  }

}
