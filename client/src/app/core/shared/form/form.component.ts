import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'rh-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() submitLabel: string;
  @Output() submit: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }
  onSubmit() {
    this.submit.emit();
  }
}
