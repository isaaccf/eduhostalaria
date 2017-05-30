import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rh-counter',
  template: `
  <a [routerLink]="link">
    <span class="badge"
          [attr.data-badge]=" counter ">
        {{label}}
    </span>
  </a>
  `,
  styles: []
})
export class CounterComponent implements OnInit {
  @Input() counter: number;
  @Input() label: string;
  @Input() link: string;

  constructor() { }

  ngOnInit() {
  }

}
