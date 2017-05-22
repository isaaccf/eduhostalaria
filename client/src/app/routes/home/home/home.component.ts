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
      name: 'CIFP Compostela',
      email: 'Email',
      phone: '638172639',
      address: 'Lamas de Abade s/n, Santiago de Compostela',
      description: 'Descripción detallada del centro 1',
      image: 'https://picturepan2.github.io/spectre/img/macos-sierra-2.jpg',
      standardPrice: 230,
      reducedPrice: 124,
    },
    {
      _id: '1',
      name: 'IES de Foz',
      email: 'Email',
      phone: '638172639',
      address: 'Rúa Castelao s/n, Foz',
      description: 'Descripción detallada del centro 2',
      image: 'https://picturepan2.github.io/spectre/img/macos-sierra-2.jpg',
      standardPrice: 230,
      reducedPrice: 124,
    },
    {
      _id: '3',
      name: 'CIFP Paseo das Pontes',
      email: 'Email',
      phone: '638172639',
      address: 'Rúa San Pedro de Mezonzo, nº4, A Coruña',
      description: 'Descripción detallada del centro 3',
      image: 'https://picturepan2.github.io/spectre/img/macos-sierra-2.jpg',
      standardPrice: 230,
      reducedPrice: 124,
    },
    {
      _id: '4',
      name: 'IES Fraga do Eume',
      email: 'Email',
      phone: '638172639',
      address: 'Rúa Ricardo Sánchez 3, Pontedeume',
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
