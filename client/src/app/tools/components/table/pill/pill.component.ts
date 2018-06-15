import { Component, Input } from '@angular/core';

@Component({
  selector: 'ab-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.css']
})
export class PillComponent {

  private labels = {
    ACTIVE: 'label-success',
    ATTENDED: 'label-warning',
    CANCELED: 'label-error',
    DISABLED: 'label-grey',
    PAID: 'label-secondary',
    PENDING: 'label-pending'
  };

  @Input() text: any;
  @Input() link?: string;

  constructor() { }

  getClass() {
    const value = this.labels[this.text];

    if (value) {
      return value;
    } else {
      return 'label-default';
    }
  }

}
