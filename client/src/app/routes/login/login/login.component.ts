import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';

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
      email: ['', Validators.required],
      password: ['', Validators.required],
      organizationId: 1,
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    const credentials = this.loginForm.value;
    this.http
      .post('http://localhost:3000/credentials/client', credentials)
      .subscribe(r => {
        const token = r.json();
        localStorage.setItem('token', token);
      });
  }

}
