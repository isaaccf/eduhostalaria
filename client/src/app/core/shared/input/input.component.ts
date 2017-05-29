import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'rh-input',
  template: `
  <section [formGroup]="formGroup">
    <label [for]="formControlName">{{ label }}:</label>
    <input [formControlName]="formControlName"
          [type]="type" />
    <rh-control-error [formGroup]="formGroup" [field]="formControlName">
    </rh-control-error>
  </section>
  `,
  styles: []
})
export class InputComponent implements OnInit {

  @Input() label: string;
  @Input() type: string;
  @Input() formControlName: string;
  @Input() formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }


}
