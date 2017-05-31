import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'rh-god-organizations-list',
  templateUrl: './god-organizations-list.component.html',
  styles: []
})
export class GodOrganizationsListComponent implements OnInit {
  @Input() public organizations: any[];
  @Output() public setAdmin = new EventEmitter<any>();
  public schema;
  constructor() { }

  ngOnInit() {
    this.schema = [
      {
        label: 'Organization',
        name: 'name',
        type: 'string'
      },
      {
        label: 'Administrator',
        name: 'admin.name',
        type: 'string'
      },
      {
        label: 'Email',
        name: 'admin.email',
        type: 'string'
      }
    ]
  }
  onSetAdminClick(organization) {
    this.setAdmin.emit(organization);
  }


}
