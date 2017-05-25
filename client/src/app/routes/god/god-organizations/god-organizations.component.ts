import { Component, OnInit } from '@angular/core';
import { IOrganizationAdmin } from "app/routes/god/_data/organization.model";

@Component({
  selector: 'rh-god-organizations',
  templateUrl: './god-organizations.component.html',
  styles: []
})
export class GodOrganizationsComponent implements OnInit {

  public organizations: IOrganizationAdmin[];

  constructor() { }

  ngOnInit() {
    this.organizations = [
      {
        id: '',
        name: 'IES Paseo das Pontes',
        adminName: 'Fulanito',
        adminEmail: 'fulano@gmail.com'
      },
      {
        id: '',
        name: 'IES Viveiro',
        adminName: 'Mario',
        adminEmail: 'marito@gmail.com'
      },
      {
        id: '',
        name: 'IES Pontevedra',
        adminName: 'Elías',
        adminEmail: 'elias@gmail.com'
      }
    ]
  }

}
