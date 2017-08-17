import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GodRoutingModule } from './god.routing';
import { ComponentsModule } from 'app/tools/components/components.module';
import { GodService } from 'app/views/god/god.service';
import { GodUsersComponent } from './god-users/god-users.component';
import { GodOrganizationsComponent } from 'app/views/god/god-organizations/god-organizations.component';

@NgModule({
  imports: [
    CommonModule,
    GodRoutingModule,
    ComponentsModule
  ],
  declarations: [
    GodOrganizationsComponent,
    GodUsersComponent],
  providers: [GodService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class GodModule { }
