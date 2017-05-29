import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'rh-input',
  template: `
  <section>
    <label [for]="formControlName">{{ label }}:</label>
    <ng-content>
    </ng-content>
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
