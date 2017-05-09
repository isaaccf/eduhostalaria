import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rh-error',
  template: `
    <p>
      error Works!
    </p>
  `,
  styles: []
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
