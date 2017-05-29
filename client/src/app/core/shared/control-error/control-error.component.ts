import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormToolsService } from 'app/core/shared/form-tools.service';


@Component({
  selector: 'rh-control-error',
  template: `
    <small *ngIf="formTools.hasErrorsToShow(form,field)" class="float-right">
      <em>{{ formTools.getErrors(form,field) | json }}</em>
    </small>
  `,
  styles: []
})
export class ControlErrorComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() field: string;
  constructor(public formTools: FormToolsService) { }

  ngOnInit() {

  }

}
