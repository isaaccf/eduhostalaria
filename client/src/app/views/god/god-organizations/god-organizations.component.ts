import { Component, OnInit } from '@angular/core';
import { IOrganizationAdmin } from 'app/views/god/organization-admin.model';
import { GodService } from 'app/views/god/god.service';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { BusService } from 'app/tools/bus.service';
import { Level } from 'app/tools/message.model';
import { IFormSchema, IWidgetSchema, IReportSchema, ILoadEmptyStateSchema, IKeyValue } from 'app/tools/schema.model';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'ab-god-organizations',
  templateUrl: './god-organizations.component.html',
  styles: []
})
export class GodOrganizationsComponent implements OnInit {
  public organizations: any[];
  public activeSetAdminModal = false;
  public activeCreateOrganizationModal = false;
  public activeDeleteOrganizationModal = false;
  public activeOrganization;
  public createFormSchema: IFormSchema;
  public actionSchema: IWidgetSchema;
  public reportSchema: IReportSchema;
  public setAdminFormSchema: IFormSchema;
  public cardSchema: IWidgetSchema;

  public name = 'organizations';
  constructor(
    private god: GodService,
    private bus: BusService) { }

  ngOnInit() {
    this.bus
      .getPageSchema$()
      .takeWhile(() => this.actionSchema == null)
      .subscribe(schemas => {
        if (schemas && schemas.metadata && schemas.metadata.name === 'god_organizations') {
          this.actionSchema = schemas.actions;
          this.createFormSchema = schemas.create;
          this.reportSchema = schemas.report;
          this.setAdminFormSchema = schemas.setAdmin;
          this.cardSchema = { header: { title: '' }, fields: this.createFormSchema.controls };
          this.getOrganizations();
        }
      });
  }

  getOrganizations() {
    this.god
      .getOrganizations()
      .do(data => this.organizations = data)
      .subscribe(this.getOrganizationsAdmins.bind(this));
  }

  getOrganizationsAdmins() {
    this.organizations.forEach(this.getOrganizationAdmin.bind(this));
  }

  getOrganizationAdmin(organization) {
    this.god
      .getOrganizationAdmin(organization._id)
      .subscribe(user => organization.admin = user);
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
  onRowAction(data: IKeyValue) {
    if (data.key === 'setAdmin') {
      this.onSetAdmin(data.value);
    }
  }
  setOrganizationAdmin(newAdmin) {
    newAdmin.organizationId = this.activeOrganization._id;
    this.god
      .setOrganizationAdmin(newAdmin)
      .subscribe(res => {
        this.bus.emit({ level: Level.SUCCESS, text: newAdmin.name + ' asiggned!!' });
        this.getOrganizations();
      });
  }

  onCreate(newOrganization) {
    this.activeCreateOrganizationModal = false;
    if (newOrganization) {
      this.god
        .postOrganization(newOrganization)
        .subscribe(res => {
          this.bus.emit({ level: Level.SUCCESS, text: newOrganization.name + ' created!!' });
          this.getOrganizations();
        });
    }
  }


  onDelete(oldOrganization) {
    this.activeDeleteOrganizationModal = false;
    this.god
      .deleteOrganization(oldOrganization)
      .subscribe(res => {
        this.bus.emit({ level: Level.SUCCESS, text: oldOrganization.name + ' deleted!!' });
        this.getOrganizations();
      });
  }
}

