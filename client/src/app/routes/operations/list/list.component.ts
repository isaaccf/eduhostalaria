import { Operation } from './../data/operation.model';
import { OperationsService } from './../data/operations.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rh-list',
  template: `
    <header>
      <h5>List of operations</h5>
    </header>
    <main>
      <ul class="container">
        <rh-row *ngFor="let operation of operations" 
            [operation]="operation" 
            (delete)="onDelete(operation)">
        </rh-row>
      </ul>
    </main>
  `,
  styles: []
})
export class ListComponent implements OnInit {
  public operations: Operation[];
  constructor(public operationsService: OperationsService) { }

  ngOnInit() {
    this.getOperationList();
  }

  getOperationList() {
    this.operations = this.operationsService.getOperations();
  }

  onDelete(operation) {
    this.operationsService.deleteOperation(operation);
    this.getOperationList();
  }
}
