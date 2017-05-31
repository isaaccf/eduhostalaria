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
  public activeSetAdminModal = false;
  public activeCreateOrganizationModal = false;
  public activeOrganization;
  constructor(private godData: GodDataService) { }

  ngOnInit() {
    this.getOrganizations();
    this.godData
      .getOrganizationsFull()
      .subscribe(data => this.organizationsFull = data);
  }

  getOrganizations() {
    this.godData
      .getOrganizations()
      .do(data => this.organizations = data)
      .subscribe(data => {
        this.organizations.forEach(org => {
          this.godData
            .getOrganizationAdmin(org.id)
            .subscribe(user => {
              org.admin = user[0];
            });
        });
      });
  }

  onSetAdmin(organization) {
    this.activeOrganization = organization;
    this.activeSetAdminModal = true;
  }

  onCloseSetAdminModal(newAdmin) {
    if (newAdmin) {
      this.setOrganizationAdmin(newAdmin);
    }
    this.activeOrganization = null;
    this.activeSetAdminModal = false;
  }
  setOrganizationAdmin(newAdmin) {
    newAdmin.organizationId = this.activeOrganization.id;
    this.godData
      .setOrganizationAdmin(newAdmin)
      .subscribe(res => this.getOrganizations());
  }

  onCreateOrganization() {
    this.activeCreateOrganizationModal = true;
  }

  onCloseCreateOrganizationModal(newOrganization) {
    this.activeCreateOrganizationModal = false;
    if (newOrganization) {
      this.godData
        .postOrganization(newOrganization)
        .subscribe(res => this.getOrganizations());
    }
  }
}

