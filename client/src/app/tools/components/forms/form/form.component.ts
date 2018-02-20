import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IFormSchema, IForm } from 'app/tools/schema.model';
import { FormToolsService } from 'app/tools/components/forms/form-tools.service';

@Component({
  selector: 'ab-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {

  @Input() formSchema: IFormSchema;

  @Output() send: EventEmitter<any> = new EventEmitter<any>();
  @Output() afterInit: EventEmitter<any> = new EventEmitter<any>();

  public form: IForm;

  constructor(private formBuilder: FormBuilder, private formTools: FormToolsService) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.formSchema) {
      let formSchema = changes.formSchema.currentValue;
      if (!formSchema || !formSchema.controls) {
        return;
      }
      formSchema = this.checkDates(formSchema);
      const controlsGroup = {};
      formSchema.controls.forEach(c => {
        controlsGroup[c.key] = [
          c.defaultValue,
          c.validators.map(this.formTools.getValidator)
        ]
      });
      const formGroup = this.formBuilder.group(controlsGroup);
      this.form = {
        schema: formSchema,
        group: formGroup
      };
      this.formSchema = formSchema;
      if (this.formSchema.title === 'Filtros') {
        this.watchFilterChanges();
      }
      this.afterInit.emit(this.form.group.value);
    }
  }

  checkDates(formSchema) {
    formSchema.controls.forEach(control => {
      if (control.type === 'date' && control.today) {
        const currDate = new Date();
        if ((currDate.getMonth() + 1).toString().length === 1) {
          control.defaultValue = `${currDate.getFullYear()}-0${currDate.getMonth() + 1}-${currDate.getDate()}`;
        } else {
          control.defaultValue = `${currDate.getFullYear()}-0${currDate.getMonth() + 1}-${currDate.getDate()}`;
        }
      }
    });
    return formSchema;
  }

  watchFilterChanges() {
    this.form.group.valueChanges.subscribe(
      (form: FormGroup) => {
        this.onClick();
      }
    )
  }

  onClick() {
    this.send.emit(this.form.group.value);
  }

  // tslint:disable-next-line:cyclomatic-complexity
  getClasses(control) {
    let classes = 'form-group column col-lg-12';

    if (control.type !== 'wysiwyg' && control.type !== 'textarea' &&
      control.type !== 'email' && control.type !== 'password') {
      classes += ' col-6';
    }

    if (control.type === 'wysiwyg' || control.type === 'textarea'
      || control.type === 'email' || control.type === 'password') {
      classes += ' col-12';
    }

    return classes;
  }
}
