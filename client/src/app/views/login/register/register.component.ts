import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'app/tools/security.service';
import { BusService } from 'app/tools/bus.service';
import { ActivatedRoute } from '@angular/router';
import { IFormSchema } from 'app/tools/schema.model';
import { SchemaService } from 'app/tools/components/schema.service';
import { IUser } from 'app/tools/user.model';

@Component({
  selector: 'ab-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  public schemas;
  public user;

  constructor(
    private security: SecurityService,
    private bus: BusService,
    private schema: SchemaService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.schema
      .getSchema$('register')
      .subscribe(schemas => this.schemas = schemas);
  }

  onSend(credentials) {
    this.security
      .logInUser(credentials);
  }

}
