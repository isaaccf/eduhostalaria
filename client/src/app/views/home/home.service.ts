import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { IOrganization } from 'app/tools/organization.model';

@Injectable()
export class HomeService {
  private url = 'home';
  constructor(private http: HttpClient) { }

  getAllOrganizations(): Observable<IOrganization[]> {
    return this.http
      .get<IOrganization[]>(`${this.url}/organizations`);
  }

}
