import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'rh-input',
  templateUrl: './input.component.html',
  styles: []
})
export class InputComponent implements OnInit {

  @Input() label: string;
  @Input() type: string;
  @Input() formControlName: string;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
