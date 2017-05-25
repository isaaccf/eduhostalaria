import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rh-god-organizations',
  templateUrl: './god-organizations.component.html',
  styles: []
})
export class GodOrganizationsComponent implements OnInit {

  public organizations: any[];

  constructor() { }

  ngOnInit() {
    this.organizations = [
      {
        name: 'IES Paseo das Pontes',
        admin: 'Fulanito',
        email: 'fulano@gmail.com'
      },
      {
        name: 'IES Viveiro',
        admin: 'Mario',
        email: 'marito@gmail.com'
      },
      {
        name: 'IES Pontevedra',
        admin: 'Elías',
        email: 'elias@gmail.com'
      }
    ]
  }

}
