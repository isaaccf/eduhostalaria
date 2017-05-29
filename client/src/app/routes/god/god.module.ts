import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GodRoutingModule } from './god-routing.module';
import { GodHomeComponent } from './god-home/god-home.component';
import { GodOrganizationsComponent } from './god-organizations/god-organizations.component';
import { SharedModule } from "app/core/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    GodRoutingModule,
    SharedModule
  ],
  declarations: [GodHomeComponent, GodOrganizationsComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class GodModule { }
