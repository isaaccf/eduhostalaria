import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormControl, IForm } from 'app/tools/schema.model';
import { FormToolsService } from 'app/tools/components/forms/form-tools.service';


@Component({
  selector: 'ab-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() control: IFormControl;
  @Input() form: IForm;

  constructor(public formTools: FormToolsService) { }

  ngOnInit() {
  }

}
