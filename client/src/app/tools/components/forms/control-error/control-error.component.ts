import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormControl, IForm } from 'app/tools/schema.model';
import { FormToolsService } from 'app/tools/components/forms/form-tools.service';

@Component({
  selector: 'ab-control-error',
  template: `
    <ng-container *ngIf="formTools.hasErrorsToShow(form.group,control.key)">
      <p class="form-input-hint hint-error">{{ formTools.getErrors(form.group,control.key,form.schema) | json }}</p>
    </ng-container>
  `,
  styles: [` .hint-error { color: #e85600; margin-bottom: 0px; } `]
})
export class ControlErrorComponent implements OnInit {

  @Input() control: IFormControl;
  @Input() form: IForm;

  constructor(public formTools: FormToolsService) { }

  ngOnInit() {

  }

}
