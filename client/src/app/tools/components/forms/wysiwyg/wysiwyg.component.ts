import { Component, OnInit, Input } from '@angular/core';
import { IFormControl, IForm } from 'app/tools/schema.model';
import { FormToolsService } from 'app/tools/components/forms/form-tools.service';

@Component({
  selector: 'ab-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styles: []
})
export class WysiwygComponent implements OnInit {

  @Input() control: IFormControl;
  @Input() form: IForm;

  public editorOptions = {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'size': ['small', 'normal', 'large', 'huge'] }],
        [{ 'align': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }]
      ]
    },
    placeholder: 'Escriba aquí todo o relativo ao evento'
  }

  constructor(private formTools: FormToolsService) { }

  ngOnInit() {
  }

}
