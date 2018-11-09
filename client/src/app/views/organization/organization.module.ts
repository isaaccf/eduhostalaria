import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ComponentsModule } from 'app/tools/components/components.module';
import { MeService } from 'app/views/me/me.service';
import { OrganizationService } from 'app/views/organization/organization.service';
import * as $ from 'jquery';
import { FullCalendarModule } from 'ng-fullcalendar';
import { OrganizationEventComponent } from './organization-event/organization-event.component';
import { OrganizationHomeComponent } from './organization-home/organization-home.component';
import { OrganizationTermsComponent } from './organization-terms/organization-terms.component';
import { OrganizationRoutingModule } from './organization.routing';

@NgModule({
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    ComponentsModule,
    FullCalendarModule
  ],
  declarations: [
    OrganizationHomeComponent,
    OrganizationEventComponent,
    OrganizationTermsComponent
  ],
  providers: [OrganizationService, MeService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrganizationModule {
  j = $;
}
