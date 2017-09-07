import { Component, OnInit } from '@angular/core';
import { MeService } from 'app/views/me/me.service';
import { SchemaService } from 'app/tools/components/schema.service';
import { BusService } from 'app/tools/bus.service';
import { IFormSchema, IWidgetSchema } from 'app/tools/schema.model';


@Component({
  selector: 'ab-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  public schemas;
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
    private schema: SchemaService) {
  }

  ngOnInit() {
    this.schema
      .getSchema$('me_organization')
      .subscribe(schemas => {
        this.schemas = schemas;
        this.formSchema = schemas.form;
        this.bus
          .getUser$()
          .subscribe(user => {
            if (user) {
              this.me
                .getAdministratedOrganization(user.organizationId)
                .subscribe(organization => {
                  this.schemas.header.title = organization.name;
                  this.organization = organization;
                  this.schema.populateDefaultValues(this.formSchema, this.organization);
                  this.loadedMetadata = true;
                });
            }
          });
      });
  }

  onSend(editedOrganization) {
    this.loadedMetadata = false;
    editedOrganization._id = this.organization._id;
    this.me
      .updateOrganization(editedOrganization)
      .subscribe(savedOrganization => {
        this.organization = savedOrganization;
        this.schema.populateDefaultValues(this.formSchema, this.organization);
        this.loadedMetadata = true;
      });
  }
}
