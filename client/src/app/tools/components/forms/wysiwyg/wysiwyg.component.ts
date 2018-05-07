import { Component, Input, OnInit } from '@angular/core';
import { FormToolsService } from 'app/tools/components/forms/form-tools.service';
import { IForm, IFormControl } from 'app/tools/schema.model';

@Component({
  selector: 'ab-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styles: []
})
export class WysiwygComponent implements OnInit {

  @Input() control: IFormControl;
  @Input() form: IForm;

  public modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'size': ['small', 'normal', 'large', 'huge'] }],
      [{ 'align': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }]
    ]
  };

  constructor(public formTools: FormToolsService) { }

  ngOnInit() {
  }

}
