import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationEventsComponent } from './organization-events/organization-events.component';
import { OrganizationEventsBookComponent } from './organization-events-book/organization-events-book.component';

@NgModule({
  imports: [
    CommonModule,
    OrganizationRoutingModule
  ],
  declarations: [OrganizationComponent, OrganizationEventsComponent, OrganizationEventsBookComponent]
})
export class OrganizationModule { }
