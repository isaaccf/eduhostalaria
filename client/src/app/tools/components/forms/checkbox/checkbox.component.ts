import { Component, OnInit, Input } from '@angular/core';
import { IFormControl, IForm } from '../../../schema.model';
import { FormToolsService } from '../form-tools.service';

@Component({
  selector: 'ab-checkbox',
  templateUrl: './checkbox.component.html',
  styles: []
})
export class CheckboxComponent implements OnInit {

  @Input() control: IFormControl;
  @Input() form: IForm;

  constructor(public formTools: FormToolsService) { }

  ngOnInit() {
  }

}
