import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';

@Component({
  selector: 'rh-bigbang',
  template: `
    <rh-form [formGroup]="form"
          submitLabel="Create!!!"
          (submit)="onSubmit()">
      <section>
        <label for="secret">Secret:</label>
        <input formControlName="secret"
              type="password" />
        <rh-control-error [form]="form" field="secret">
        </rh-control-error>
      </section>
    </rh-form>
  `,
  styles: []
})
export class BigbangComponent implements OnInit {

  public form: FormGroup;

  constructor(public http: Http, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      secret: ['', Validators.required],
    });
  }

  onSubmit() {
    const credentials = this.form.value;
    this.http
      .post('http://localhost:3000/credentials/bigbang', credentials)
      .subscribe(
      r => {
        console.warn(r.json());
      },
      e => {
        console.error(e);
      });
  }

}
