import { OperationsService } from './data/operations.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rh-operations',
  template: `
    <article class="container">
      <header>
        <nav>
          <a routerLink="/operations/new">->New</a>
          <a routerLink="/operations/list">   ->List</a>
          <span class="float-right">Num Ops: <strong>{{ operationsCount }}</strong></span>
        </nav>
      </header>
      <router-outlet></router-outlet>
    </article>
  `,
  styles: []
})
export class OperationsComponent implements OnInit {

  public operationsCount = 0;
  constructor(public operationsService: OperationsService) { }

  ngOnInit() {
    this.subscribeToOperationsCount();
  }

  subscribeToOperationsCount() {
    this.operationsService.getOperationsCount$()
      .subscribe(data => this.operationsCount = data)
  }
}
