import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rh-top-bar',
  template: `
    <nav>
      <a routerLink="/">->Home</a>
      <a routerLink="/operations">   ->Operations</a>
      <a routerLink="/about">   ->About</a>
    </nav>
  `,
  styles: []
})
export class TopBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
