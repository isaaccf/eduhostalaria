import { Component, OnInit } from '@angular/core';
import { MeService } from "app/views/me/me.service";
import { SchemaService } from "app/tools/components/schema.service";
import { BusService } from "app/tools/bus.service";
import { IFormSchema, IWidgetSchema } from "app/tools/schema.model";


@Component({
  selector: 'ab-organization',
  templateUrl: './organization.component.html',
  styles: []
})
export class OrganizationComponent implements OnInit {
  public panelSchema: IWidgetSchema;
  public formSchema: IFormSchema;
  loadedMetadata = false;
  loadingPanelSchema = {
    loading: true,
    empty: false
  };
  organization: any;
  constructor(
    private bus: BusService,
    private me: MeService,
    private schemaService: SchemaService) {
  }

  ngOnInit() {
    this.bus
      .getPageSchema$()
      .takeWhile(() => this.panelSchema == null)
      .subscribe(schemas => {
        if (schemas && schemas.metadata && schemas.metadata.name === 'me_organization') {
          this.panelSchema = schemas.panel;
          this.formSchema = schemas.form;
          this.bus
            .getUser$()
            .subscribe(user => {
              if (user) {
                this.me
                  .getAdministratedOrganization(user.organizationId)
                  .subscribe(organization => {
                    this.organization = organization;
                    this.schemaService.populateDefaultValues(this.formSchema, this.organization);
                    this.loadedMetadata = true;
                  });
              }
            });
        }
      });
  }

  onSend(editedOrganization) {
    this.loadedMetadata = false;
    editedOrganization._id = this.organization._id;
    this.me
      .updateOrganization(editedOrganization)
      .subscribe(savedOrganization => {
        this.organization = savedOrganization;
        this.schemaService.populateDefaultValues(this.formSchema, this.organization);
        this.loadedMetadata = true;
      });
  }
}
