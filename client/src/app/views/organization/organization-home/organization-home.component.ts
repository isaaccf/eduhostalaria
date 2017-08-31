import { Component, OnInit } from '@angular/core';
import { IFormSchema, IWidgetSchema } from 'app/tools/schema.model';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { IOrganization, OrganizationService } from 'app/views/organization/organization.service';



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
  public organization: IOrganization;
  public viewSchema: IWidgetSchema;
  public formSchema: IFormSchema;

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private location: Location) { }
  setSchemas() {
    this.organizationService.getViewSchema().subscribe(s => {
      this.viewSchema = s;
      this.viewSchema.header.title = this.organization.name;
      this.viewSchema.header.subtitle = this.organization.slogan;
    });
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        const slug = params['slug'];
        this.organizationService
          .getOrganizationBySlug(slug)
          .subscribe(organization => {
            this.organization = organization;
            if (this.organization) {
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


