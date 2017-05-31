import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'rh-god-organizations-list',
  templateUrl: './god-organizations-list.component.html',
  styles: []
})
export class GodOrganizationsListComponent implements OnInit {
  @Input() public organizations: any[];
  @Output() public setAdmin = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
  onSetAdminClick(organization) {
    this.setAdmin.emit(organization);
  }
}
