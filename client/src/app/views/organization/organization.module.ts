import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from './organization.routing';
import { OrganizationHomeComponent } from './organization-home/organization-home.component';
import { ComponentsModule } from 'app/tools/components/components.module';
import { OrganizationService } from 'app/views/organization/organization.service';


@NgModule({
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    ComponentsModule
  ],
  declarations: [OrganizationHomeComponent],
  providers: [OrganizationService]
})
export class OrganizationModule { }
