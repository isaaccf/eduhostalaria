import { Component, OnInit } from '@angular/core';
import { SecurityService, IUserCredential } from 'app/tools/security.service';
import { SchemaService } from 'app/tools/components/schema.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ab-forgot',
  templateUrl: './forgot.component.html',
  styles: []
})
export class ForgotComponent implements OnInit {
  public schemas;

  constructor(
    private security: SecurityService,
    private schema: SchemaService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.schema
      .getSchema$('forgot_password')
      .subscribe(schemas => this.schemas = schemas);
  }

  onSend(credentials: IUserCredential) {
    this.security
      .logInUser(credentials);
  }
}
