import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rh-shell',
  template: `
    <rh-top-bar></rh-top-bar>
    <rh-main-content></rh-main-content>
  `,
  styles: []
})
export class ShellComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
