import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization/organization.component';
import { EventsComponent } from './events/events.component';
import { EventsBookComponent } from './events-book/events-book.component';

@NgModule({
  imports: [
    CommonModule,
    OrganizationRoutingModule
  ],
  declarations: [OrganizationComponent, EventsComponent, EventsBookComponent]
})
export class OrganizationModule { }
