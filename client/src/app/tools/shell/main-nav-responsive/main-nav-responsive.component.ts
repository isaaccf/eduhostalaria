import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'app/tools/user.model';
import { IAction } from 'app/tools/schema.model';

@Component({
  selector: 'ab-main-nav-responsive',
  templateUrl: './main-nav-responsive.component.html',
  styleUrls: ['./main-nav-responsive.component.css']
})
export class MainNavResponsiveComponent implements OnInit {

  @Input() public user: IUser = null;
  @Input() menuLinks: IAction[];
  @Input() showResponsive: boolean;
  @Input() public numMessages: number;

  constructor() { }

  ngOnInit() {
  }

}
