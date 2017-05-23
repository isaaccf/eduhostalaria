import { Component, OnInit } from '@angular/core';
import { IMenuLink } from 'app/core/layout/_data/models/menu-link.model';

@Component({
  selector: 'rh-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  title = 'Reservas Hostelaría';
  menuLinks: IMenuLink[] = [
    {
      title: 'Home',
      href: ''
    },
    {
      title: 'Log in',
      href: 'login'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
