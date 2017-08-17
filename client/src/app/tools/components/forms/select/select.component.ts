import { Component, OnInit, Input } from '@angular/core';
import { IFormControl, IForm } from 'app/tools/schema.model';
import { FormToolsService } from 'app/tools/components/forms/form-tools.service';


@Component({
  selector: 'ab-select',
  templateUrl: './select.component.html',
  styles: []
})
export class SelectComponent implements OnInit {

  @Input() control: IFormControl;
  @Input() form: IForm;

  constructor(public formTools: FormToolsService) { }

  ngOnInit() {
  }

}
