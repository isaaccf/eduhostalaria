import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'ab-organization-terms',
  templateUrl: './organization-terms.component.html',
  styles: ['./organization.terms.component.css']
})
export class OrganizationTermsComponent implements OnInit {

  public organization: any;

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService
  ) { }

  ngOnInit() {
    this.getOrganization();
  }

  getOrganization() {
    this.route.parent.params.subscribe(
      (params: Params) => {
        this.organizationService.getOrganizationBySlug(params.slug).subscribe(
          (organization: any) => { this.organization = organization }
        );
      }
    )
  }

}
