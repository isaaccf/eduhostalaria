import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GodRoutingModule } from './god-routing.module';
import { GodHomeComponent } from './god-home/god-home.component';
import { GodOrganizationsComponent } from './god-organizations/god-organizations.component';

@NgModule({
  imports: [
    CommonModule,
    GodRoutingModule
  ],
  declarations: [GodHomeComponent, GodOrganizationsComponent]
})
export class GodModule { }
