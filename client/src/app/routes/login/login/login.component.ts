import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'rh-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup
  public schemma: any[];

  constructor(public http: Http, public formBuilder: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.schemma = ['email', 'password'];
  }

  onSend() {
    const credentials = this.loginForm.value;
    this.http
      .post('http://localhost:3000/credentials', credentials)
      .subscribe(r => {
        const token = r.json();
        localStorage.setItem('token', token);
        this.router.navigate(['/god']);
      });
  }

}
