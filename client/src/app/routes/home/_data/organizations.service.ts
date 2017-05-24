import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IOrganization } from 'app/routes/home/_data/models/organization.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class OrganizationsService {
  private organizationsSeed: IOrganization[] = [
    {
      name: 'CIFP Compostela',
      email: 'Email',
      phone: '638172639',
      address: 'Lamas de Abade s/n, Santiago de Compostela',
      url: '',
      description: 'Descripción detallada del centro 1',
      image: 'https://picturepan2.github.io/spectre/img/macos-sierra-2.jpg',
      standardPrice: 230,
      reducedPrice: 124,
    },
    {
      name: 'IES de Foz',
      email: 'Email',
      phone: '638172639',
      address: 'Rúa Castelao s/n, Foz',
      url: '',
      description: 'Descripción detallada del centro 2',
      image: 'https://picturepan2.github.io/spectre/img/macos-sierra-2.jpg',
      standardPrice: 230,
      reducedPrice: 124,
    },
    {
      name: 'CIFP Paseo das Pontes',
      email: 'Email',
      phone: '638172639',
      address: 'Rúa San Pedro de Mezonzo, nº4, A Coruña',
      url: '',
      description: 'Descripción detallada del centro 3',
      image: 'https://picturepan2.github.io/spectre/img/macos-sierra-2.jpg',
      standardPrice: 230,
      reducedPrice: 124,
    },
    {
      name: 'IES Fraga do Eume',
      email: 'Email',
      phone: '638172639',
      address: 'Rúa Ricardo Sánchez 3, Pontedeume',
      url: '',
      description: 'Descripción detallada del centro 3',
      image: 'https://picturepan2.github.io/spectre/img/macos-sierra-2.jpg',
      standardPrice: 230,
      reducedPrice: 124,
    }
  ];
  private organizations: IOrganization[];
  private url: 'http://localhost:3000/organizations';
  constructor(private http: Http) { }

  getAll(): Observable<IOrganization[]> {
    if (this.organizations && this.organizations.length > 0) {
      return Observable.of(this.organizations);
    } else {
      return this.http
        .get('http://localhost:3000/organizations')
        .map(r => {
          const _data = r.json();
          this.organizations = _data;
          return _data;
        });
    }
  }

  postSeed(): Observable<any> {
    const o$ = this.organizationsSeed.map(o => this.http.post('http://localhost:3000/organizations', o));
    return Observable.forkJoin(o$);
  }
}
