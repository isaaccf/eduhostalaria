import { Component, OnInit } from '@angular/core';
import { IMenuLink } from 'app/core/layout/_data/models/menu-link.model';

@Component({
  selector: 'rh-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  private title = 'APP';
  private menuLinks: IMenuLink[] = [
    {
      title: 'Link 1',
      href: '#'
    },
    {
      title: 'Link 2',
      href: '#'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
