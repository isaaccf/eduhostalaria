import { Component, OnInit } from '@angular/core';
import { IOrganizationAdmin } from 'app/routes/god/_data/organization.model';
import { GodDataService } from 'app/routes/god/_data/god-data.service';
import 'rxjs/add/operator/do';
@Component({
  selector: 'rh-god-organizations',
  templateUrl: './god-organizations.component.html',
  styles: []
})
export class GodOrganizationsComponent implements OnInit {

  public organizations: any[];
  public organizationsFull: any[];
  public activeModal = false;
  public activeOrganization;
  constructor(private godData: GodDataService) { }

  ngOnInit() {
    this.godData
      .getOrganizations()
      .do(data => this.organizations = data)
      .subscribe(data => {
        this.organizations.forEach(org => {
          this.godData
            .getOrganizationAdmin(org.id)
            .subscribe(user => org.admin = user);
        });
      });
    this.godData
      .getOrganizationsFull()
      .subscribe(data => this.organizationsFull = data);
  }

  onAddAdmin(organization) {
    this.activeOrganization = organization;
    this.activeModal = true;
  }
}

