import { observable } from 'rxjs/symbol/observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SchemaService } from 'app/tools/components/schema.service';

@Injectable()
export class MeService {
  private organizationsUrl = '_/organizations';
  private usersUrl = '_/users';
  private credentialsUrl = 'credentials';

  constructor(private http: HttpClient, private schemaService: SchemaService) { }

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
}



export interface IOrganization {
  name: string;
  slug: string;
  description: string
}
