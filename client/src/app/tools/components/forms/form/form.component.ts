import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormToolsService } from 'app/tools/components/forms/form-tools.service';
import { IForm, IFormSchema } from 'app/tools/schema.model';

@Component({
  selector: 'ab-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnChanges {

  @Input() formSchema: IFormSchema;

  @Output() send: EventEmitter<any> = new EventEmitter<any>();
  @Output() afterInit: EventEmitter<any> = new EventEmitter<any>();

  public form: IForm;

  constructor(private formBuilder: FormBuilder, private formTools: FormToolsService) { }

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
          control.defaultValue = `${currDate.getFullYear()}-0${currDate.getMonth() + 1}-${this.addZeroIfNot(currDate.getDate())}`;
        } else {
          control.defaultValue = `${currDate.getFullYear()}-0${currDate.getMonth() + 1}-${this.addZeroIfNot(currDate.getDate())}`;
        }
      }
    });
    return formSchema;
  }

  addZeroIfNot(day: number) {
    const str = day.toString();

    if (str.length === 1) {
      return `0${str}`;
    }

    return str;
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

  isTwoColumns(type: string) {
    return type !== 'wysiwyg' && type !== 'textarea'
      && type !== 'checkbox' && type !== 'email'
      && type !== 'password'
  }

  getClasses(control) {
    let classes = 'form-group column col-lg-12';

    if (this.isTwoColumns(control.type)) {
      classes += ' col-6';
    } else {
      classes += ' col-12';
    }

    return classes;
  }
}
