import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MeComponent } from './me/me.component';
import { ComponentsModule } from 'app/tools/components/components.module';

import { MeRoutingModule } from 'app/views/me/me.routing';
import { MeService } from 'app/views/me/me.service';
import { UsersComponent } from 'app/views/me/users/users.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { OrganizationsComponent } from "app/views/me/organizations/organizations.component";

@NgModule({
  imports: [
    CommonModule,
    MeRoutingModule,
    ComponentsModule
  ],
  declarations: [MeComponent, UsersComponent, ConfirmationComponent, OrganizationsComponent],
  providers: [MeService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MeModule { }
