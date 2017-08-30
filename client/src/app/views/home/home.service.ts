import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { IOrganization } from "app/tools/organization.model";

@Injectable()
export class HomeService {
  private url = 'home';
  constructor(private http: HttpClient) { }

  getAllOrganizations(): Observable<IOrganization[]> {
    return this.http
      .get<IOrganization[]>(`${this.url}/organizations`);
  }

}
