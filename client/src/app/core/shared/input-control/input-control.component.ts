import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'rh-input-control',
  template: `
  <section  [formGroup]="form">
    <label for="{{formControlName}}">{{ label }}:</label>
    <input formControlName="{{formControlName}}"
           type="{{type}}" />
    <small *ngIf="form.get(formControlName).invalid"
           class="float-right">
             Error in field {{formControlName}}
      </small>
  </section>
  `,
  styles: []
})
export class InputControlComponent implements OnInit {

  @Input() label: string;
  @Input() type: string;
  @Input() formControlName: string;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
