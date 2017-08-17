import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFormSchema, IWidgetSchema } from 'app/tools/schema.model';
import { SecurityService, IInvitationCredential } from 'app/tools/security.service';
import { SchemaService } from 'app/tools/components/schema.service';

@Component({
  selector: 'ab-me-register',
  templateUrl: './me-register.component.html',
  styles: []
})
export class MeRegisterComponent implements OnInit {
  loadedMetadata = false;
  loadingPanelSchema = {
    loading: true,
    empty: false
  };
  public panelSchema: IWidgetSchema;
  public formSchema: IFormSchema;
  public userId: string;
  constructor(private route: ActivatedRoute, private schemaService: SchemaService, private securityService: SecurityService) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.userId = params['hash'];
      });
    this.schemaService.getSchema('accept_invitation')
      .subscribe(schemas => {
        this.panelSchema = schemas.panel;
        this.formSchema = schemas.form;
        this.loadedMetadata = true;
      });
  }


  onSend(credentials: IInvitationCredential) {
    if (credentials.password === credentials.passwordBis) {
      credentials.hash = this.userId;
      this.securityService.acceptInvitation(credentials);
    } else {
      // TODO show dont match message
    }
  }
}
