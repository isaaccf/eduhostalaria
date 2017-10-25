import { Component, OnInit, Input } from '@angular/core';
import { IForm, IFormControl } from 'app/tools/schema.model';
import { FormToolsService } from 'app/tools/components/forms/form-tools.service';


@Component({
  selector: 'ab-switch',
  templateUrl: './switch.component.html',
  styles: []
})
export class SwitchComponent implements OnInit {

  @Input() control: IFormControl;
  @Input() form: IForm;

  constructor(public formTools: FormToolsService) { }

  ngOnInit() {
  }

}
