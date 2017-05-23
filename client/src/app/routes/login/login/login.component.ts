import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Http } from "@angular/http";

@Component({
  selector: 'rh-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup

  constructor(public http: Http, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
      organizationId: 1,
      name: ''
    });
  }

  onSubmit() {
    const credentials = this.loginForm.value;
    this.http
      .post('http://localhost:3000/credentials', credentials)
      .subscribe(r => {
        const token = r.json();
        localStorage.setItem('token', token);
      });
  }

}
