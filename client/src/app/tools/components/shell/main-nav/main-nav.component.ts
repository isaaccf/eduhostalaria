import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'app/tools/user.model';
import { IAction } from 'app/tools/schema.model';
import { SecurityService } from '../../../security.service';

@Component({
  selector: 'ab-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  @Input() public user: IUser = null;
  @Input() public numMessages: number;
  @Input() public menuLinks: IAction[];

  public title = 'Menú';

  constructor(
  ) { }

  ngOnInit() {
  }

}
