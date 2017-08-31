import { Component, OnInit } from '@angular/core';
import { SecurityService } from "app/tools/security.service";
import { BusService } from "app/tools/bus.service";
import { ActivatedRoute } from "@angular/router";
import { IFormSchema } from "app/tools/schema.model";
import { SchemaService } from "app/tools/components/schema.service";

@Component({
  selector: 'ab-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  public formSchema: IFormSchema;

  constructor(
    private security: SecurityService,
    private bus: BusService,
    private schema: SchemaService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.schema.getSchema$('register').subscribe(schema => this.formSchema = schema.form);
  }

  onSend(credentials) {
    this.security
      .logInUser(credentials);
  }


}
