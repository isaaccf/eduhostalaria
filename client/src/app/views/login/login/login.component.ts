import { Component, OnInit } from '@angular/core';
import { IFormSchema, IWidgetSchema } from 'app/tools/schema.model';
import { SecurityService, IUserCredential } from 'app/tools/security.service';
import { environment } from './../../../../environments/environment';
import { SchemaService } from 'app/tools/components/schema.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/takeWhile';
@Component({
  selector: 'ab-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  public schemas;

  constructor(
    private security: SecurityService,
    private schema: SchemaService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.schema
      .getSchema$('login')
      .subscribe(schemas => this.schemas = schemas);
  }

  onSend(credentials: IUserCredential) {
    this.security
      .logInUser(credentials);
  }

}


