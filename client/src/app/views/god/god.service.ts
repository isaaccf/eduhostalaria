import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { BusService } from 'app/tools/bus.service';
import { SecurityService } from 'app/tools/security.service';
import { ROLE } from 'app/tools/user.model';

@Injectable()
export class GodService {
  private organizationsUrl = '_/organizations';
  private credentialsUrl = 'credentials';
  private usersUrl = '_/users';

  constructor(private http: HttpClient, private bus: BusService, private security: SecurityService) { }

  getOrganizationsCount(): Observable<number> {
    return this.http
      .get<any>(`${this.organizationsUrl}/count`)
      .map(res => res.data);
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
    newAdmin.roles = ROLE.ADMIN;
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

  getUsers(): Observable<any[]> {
    return this.http
      .get<any>(this.usersUrl);
  }
}
