import { observable } from 'rxjs/symbol/observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SchemaService } from 'app/tools/components/schema.service';
import { IOrganization } from "app/tools/organization.model";
import { SecurityService } from "app/tools/security.service";

@Injectable()
export class MeService {
  private organizationsUrl = '_/organizations';
  private usersUrl = '_/users';
  private credentialsUrl = 'credentials';

  constructor(private http: HttpClient, private schemaService: SchemaService, private security: SecurityService) { }

  getMeSchema(): Observable<any> {
    return this.schemaService.getSchema('me');
  }

  getChangePasswordSchema(): Observable<any> {
    return this.schemaService.getSchema('change_password');
  }

  getMeGodSchema(): Observable<any> {
    return this.schemaService.getSchema('me_god');
  }

  getMeOrganizationsSchema(): Observable<any> {
    return this.schemaService.getSchema('me_organizations');
  }

  getOrganizationsCount(): Observable<number> {
    return this.http
      .get<any>(`${this.organizationsUrl}/count`)
      .map(res => res.data);
  }

  getUsersCount(): Observable<number> {
    return this.http
      .get<any>(`${this.usersUrl}/count`)
      .map(res => res.data);
  }


  getAdministratedOrganization(id): Observable<IOrganization> {
    return this.http
      .get<IOrganization>(`${this.organizationsUrl}/${id}`);
  }

  changePassword(password: any): Observable<any> {
    return this.http.patch(`${this.credentialsUrl}/`, password);
  }

  getUsers(): Observable<any[]> {
    return this.http
      .get<any>(this.usersUrl);
  }

  disableUser(user: any): Observable<any> {
    return this.http
      .post(`${this.credentialsUrl}/_/dissableds`, user);
  }

  approbeUser(user: any): Observable<any> {
    return this.http
      .post(`${this.credentialsUrl}/_/approvals`, user);
  }

  deleteUser(user: any): Observable<any> {
    return this.http
      .delete(`${this.credentialsUrl}/_/${user._id}`);
  }

  inviteUser(user: any): Observable<any> {
    user.roles = [user.role];
    user.organizationId = this.security.getLocalUser().organizationId;
    delete user.role;
    return this.http
      .post(`${this.credentialsUrl}/_/invitations`, user);
  }

  getOrganizations(): Observable<any[]> {
    return this.http
      .get<any>(this.organizationsUrl)
      .map(data => data.map(d => {
        const org = { _id: d._id, name: d.name, admin: { name: '', email: '', userId: '' } };
        return org;
      }))
  }

  getOrganizationAdmin(organizationId: number): Observable<any> {
    const params = new HttpParams().set('role', 'ADMIN');
    const url = `${this.organizationsUrl}/${organizationId}/users`;
    return this.http.get<any>(url, { params });
  }


  setOrganizationAdmin(newAdmin) {
    newAdmin.roles = [];
    newAdmin.roles.push('ADMIN');
    return this.http
      .post(`${this.credentialsUrl}/_/invitations`, newAdmin);
  }

  postOrganization(newOrganization) {
    return this.http
      .post(this.organizationsUrl, newOrganization);
  }

  deleteOrganization(oldOrganization) {
    return this.http
      .delete(`${this.organizationsUrl}/${oldOrganization._id}`);
  }

  updateOrganization(organization: IOrganization): Observable<IOrganization> {
    return this.http
      .patch<IOrganization>(`${this.organizationsUrl}`, organization);
  }
}

