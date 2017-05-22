import { Component, OnInit } from '@angular/core';
import { IOrganization } from 'app/routes/home/_data/models/organization.model';

@Component({
  selector: 'rh-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  private organizations: IOrganization[] = [
    {
      _id: '0',
      name: 'Nombre 1',
      email: 'Email',
      phone: '638172639',
      address: 'Calle Juan Florez, 156',
      description: 'Descripción detallada del centro 1',
      image: 'https://picturepan2.github.io/spectre/img/macos-sierra-2.jpg',
      standardPrice: 230,
      reducedPrice: 124,
    },
    {
      _id: '1',
      name: 'Nombre 2',
      email: 'Email',
      phone: '638172639',
      address: 'Avenida Finisterre, 35',
      description: 'Descripción detallada del centro 2',
      image: 'https://picturepan2.github.io/spectre/img/macos-sierra-2.jpg',
      standardPrice: 230,
      reducedPrice: 124,
    },
    {
      _id: '3',
      name: 'Nombre 3',
      email: 'Email',
      phone: '638172639',
      address: 'Calle de San Andrés, 50',
      description: 'Descripción detallada del centro 3',
      image: 'https://picturepan2.github.io/spectre/img/macos-sierra-2.jpg',
      standardPrice: 230,
      reducedPrice: 124,
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
