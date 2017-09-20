import { Component, OnInit } from '@angular/core';
import { IWidgetSchema, IFormSchema } from 'app/tools/schema.model';
import { ActivatedRoute } from '@angular/router';
import { SchemaService } from 'app/tools/components/schema.service';
import { SecurityService, IInvitationCredential } from 'app/tools/security.service';
import { BusService } from 'app/tools/bus.service';
import { Level } from 'app/tools/message.model';
import { LoginService } from 'app/views/login/login.service';

@Component({
  selector: 'ab-confirmation',
  templateUrl: './confirmation.component.html',
  styles: []
})
export class ConfirmationComponent implements OnInit {

  public schemas;
  public userId: string;
  public user;

  constructor(
    private route: ActivatedRoute,
    private login: LoginService,
    private bus: BusService,
    private schema: SchemaService,
    private securityService: SecurityService) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.userId = params['user_id'];
        this.login.getUserById(this.userId).subscribe(user => {
          this.schema
            .getSchema$('me_confirmation')
            .subscribe(schemas => {
              this.schemas = schemas
              this.user = user;
              this.schemas.header.title = `Hola ${this.user.name}! ` + this.schemas.header.title;
            });
        });
      });
  }

  onSend(credentials: IInvitationCredential) {
    if (credentials.password === credentials.passwordBis) {
      credentials._id = this.userId;
      console.log(credentials);
      this.securityService.confirmInvitation(credentials);
    } else {
      this.bus.emit({ level: Level.WARNING, code: 'passwordbis' })
    }
  }

}
