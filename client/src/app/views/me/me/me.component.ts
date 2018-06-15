// tslint:disable:cyclomatic-complexity
import { Component, OnInit } from '@angular/core';
import { BusService } from 'app/tools/bus.service';
import { SchemaService } from 'app/tools/components/schema.service';
import { IOrganization } from 'app/tools/organization.model';
import { IWidgetSchema } from 'app/tools/schema.model';
import { SecurityService } from 'app/tools/security.service';
import { IUser } from 'app/tools/user.model';
import { MeService } from 'app/views/me/me.service';

@Component({
  selector: 'ab-me',
  templateUrl: './me.component.html',
  styles: []
})
export class MeComponent implements OnInit {
  public schemas;
  public editProfile;
  public widgetsSchema: IWidgetSchema[];

  public user: IUser = null;
  public logOutActive: Boolean;
  public changePasswordActive: Boolean;
  public editProfileActive: Boolean;

  public organization: IOrganization = null;

  constructor(
    private security: SecurityService,
    private me: MeService,
    private bus: BusService,
    private schema: SchemaService) {
  }

  ngOnInit() {
    this.schema
      .getSchema$('me')
      .subscribe(schema => {
        this.schemas = schema;
        this.getMe();
      });
  }

  getMe() {
    this.security
      .getMe()
      .subscribe(user => {
        if (user) {
          this.user = user;
          this.editProfile = this.schemas.editProfile;
          this.schema.populateDefaultValues(this.editProfile, this.user);
          this.widgetsSchema = [];
          const userSchema = this.schemas.userSchema;
          const userRole = this.user.roles[0].toString().toLowerCase();
          userSchema.header.title = this.user.name + ' - ' + userRole.toUpperCase();
          userSchema.header.subtitle = this.user.email;
          this.widgetsSchema.push(userSchema);
          const roleSchema = this.schemas[userRole];
          this.configureRoleSchemas(userRole, roleSchema);
          this.widgetsSchema = this.widgetsSchema.concat(roleSchema);
        } else {
          this.security.logOutUser();
        }
      });
  }

  configureRoleSchemas(userRole, roleSchema) {
    if (userRole === 'god') {
      this.me.getOrganizationsCount()
        .subscribe(count => roleSchema[0].header.counter = count);
      this.me.getUsersCount()
        .subscribe(count => roleSchema[1].header.counter = count);
    } else if (userRole === 'admin') {
      this.me.getAdministratedOrganization(this.user.organizationId)
        .subscribe(organization => {
          this.organization = organization;
          if (this.organization) {
            roleSchema[0].header.title = this.organization.name;
            roleSchema[0].header.subtitle = this.organization.slogan;
          }
        });
      this.me.getUsersCount()
        .subscribe(count => roleSchema[1].header.counter = count);
    } else if (userRole === 'mestre') {

    } else if (userRole === 'conserje') {

    } else if (userRole === 'interno') {

    } else {
      this.security.logOutUser();
    }
  }

  onSend(event) {
    if (event.key === 'logout') {
      this.logOutActive = true;
    } else if (event.key === 'change_password') {
      this.changePasswordActive = true;
    } else if (event.key === 'edit_profile') {
      this.editProfileActive = true;
    } else if (event.key === 'delete') {
      this.deleteUser();
    }
  }

  onLogOutClick() {
    this.logOutActive = false;
    this.security.logOutUser();
  }

  onChangePasswordClick(changePasswordClaim) {
    this.me.changePassword(changePasswordClaim).subscribe();
    this.changePasswordActive = false;
  }

  onEditProfileClick(editProfileClaim) {
    this.me.editProfile(editProfileClaim).subscribe(r => this.security.getMe().subscribe(() => this.security.navigateTo(['/'])));
    this.editProfileActive = false;
  }

  deleteUser() {
    this.me.deleteUser().subscribe(
      () => {
        this.security.logOutUser();
      }
    )
  }

}
