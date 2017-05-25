import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationEventsComponent } from './organization-events/organization-events.component';
import { OrganizationEventsBookComponent } from './organization-events-book/organization-events-book.component';
import { OrganiztionHomeComponent } from './organiztion-home/organiztion-home.component';
import { OrganizationHomeComponent } from './organization-home/organization-home.component';

@NgModule({
  imports: [
    CommonModule,
    OrganizationRoutingModule
  ],
  declarations: [OrganizationComponent, OrganizationEventsComponent, OrganizationEventsBookComponent, OrganiztionHomeComponent, OrganizationHomeComponent]
})
export class OrganizationModule { }
