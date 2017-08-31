import { Component, OnInit } from '@angular/core';
import { IFormSchema, IWidgetSchema } from 'app/tools/schema.model';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { IOrganization, OrganizationService } from 'app/views/organization/organization.service';
import { SchemaService } from "app/tools/components/schema.service";



@Component({
  selector: 'ab-organization-home',
  templateUrl: './organization-home.component.html',
  styles: []
})
export class OrganizationHomeComponent implements OnInit {
  organizationsUrl = 'organizations';
  public showEdition = false;
  loadedMetadata = false;
  loadingPanelSchema = {
    loading: true,
    empty: false
  };
  public organizationData: IOrganization;
  public viewSchema: IWidgetSchema;


  constructor(
    private route: ActivatedRoute,
    private organization: OrganizationService,
    private schema: SchemaService,
    private location: Location) { }
  setSchemas() {
    this.schema.getSchema$('organization').subscribe(s => {
      this.viewSchema = s;
      this.viewSchema.header.title = this.organizationData.name;
      this.viewSchema.header.subtitle = this.organizationData.slogan || this.organizationData.city;
    });
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        const slug = params['slug'];
        this.organization
          .getOrganizationBySlug(slug)
          .subscribe(organization => {
            this.organizationData = organization;
            if (this.organizationData) {
              this.setSchemas();
            } else {
              this.loadingPanelSchema.loading = false;
              this.loadedMetadata = true;
              this.loadingPanelSchema.empty = true;
            }
          });
      });
  }

}


