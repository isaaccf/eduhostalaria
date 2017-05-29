import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'rh-form',
  template: `
  <form [formGroup]="formGroup"
        (ngSubmit)="onSubmit()"
        class="container">
    <ng-content>
    </ng-content>
    <button type="submit"
            [disabled]="formGroup.invalid">{{ submitLabel}}</button>
  </form>
  <em>{{formGroup.value | json}}</em>
  `,
  styles: []
})
export class FormComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() submitLabel: string;
  @Output() submit: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {

  }
  onSubmit() {
    this.submit.emit();
  }
}
