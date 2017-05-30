import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { ROLE } from 'app/routes/login/login/login.component';

@Injectable()
export class GodDataService {
  private url = 'http://localhost:3000/organizations';
  constructor(private http: Http) { }

  getOrganizationsCount(): Observable<number> {
    return this.http
      .get(`${this.url}/count`)
      .map(res => res.json().data);
  }

  getOrganizationsFull(): Observable<any[]> {
    return this.http
      .get(this.url)
      .map(res => res.json())
      .map(data => data.map(d => {
        const org = { id: d.id, name: d.name, admin: { name: '', email: '', userId: '' } };
        return org;
      }))
      .switchMap(orgs => {
        const observables = orgs.map(org => {
          return this
            .getOrganizationAdmin(org.id)
            .map(users => { org.admin = users && users[0]; return org; })
        });
        return Observable.forkJoin(observables);
      })
  }

  getOrganizations(): Observable<any[]> {
    return this.http
      .get(this.url)
      .map(res => res.json())
      .map(data => data.map(d => {
        const org = { id: d.id, name: d.name, admin: { name: '', email: '', userId: '' } };
        return org;
      }))
  }

  getOrganizationAdmin(organizationId: number): Observable<any> {
    const search = new URLSearchParams();
    search.set('role', ROLE.ADMIN.toString());
    return this.http
      .get(`${this.url}/${organizationId}/users`, { search })
      .map(res => res.json());
  }
}
