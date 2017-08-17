import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home.routing';
import { HomeComponent } from './home/home.component';
import { OrganizationsService } from 'app/views/home/organizations.service';
import { ComponentsModule } from 'app/tools/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentsModule
  ],
  declarations: [HomeComponent],
  providers: [OrganizationsService],
  exports: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
