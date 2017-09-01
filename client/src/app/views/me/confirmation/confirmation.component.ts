import { Component, OnInit } from '@angular/core';
import { IWidgetSchema, IFormSchema } from "app/tools/schema.model";
import { ActivatedRoute } from "@angular/router";
import { SchemaService } from "app/tools/components/schema.service";
import { SecurityService, IInvitationCredential } from "app/tools/security.service";
import { BusService } from "app/tools/bus.service";
import { Level } from "app/tools/message.model";

@Component({
  selector: 'ab-confirmation',
  templateUrl: './confirmation.component.html',
  styles: []
})
export class ConfirmationComponent implements OnInit {

  public schemas;
  public userId: string;
  constructor(
    private route: ActivatedRoute,
    private bus: BusService,
    private schema: SchemaService,
    private securityService: SecurityService) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.userId = params['user_id'];
      });
    this.schema
      .getSchema$('me_confirmation')
      .subscribe(schemas => this.schemas = schemas);
  }


  onSend(credentials: IInvitationCredential) {
    if (credentials.password === credentials.passwordBis) {
      credentials._id = this.userId;
      this.securityService.confirmInvitation(credentials);
    } else {
      this.bus.emit({ level: Level.WARNING, text: 'A repetición de contrasinal non coincide' })
    }
  }

}
