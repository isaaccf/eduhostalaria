import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MeComponent } from './me/me.component';
import { ComponentsModule } from 'app/tools/components/components.module';

import { MeRegisterComponent } from './me-register/me-register.component';
import { MeRoutingModule } from 'app/views/me/me.routing';
import { MeService } from 'app/views/me/me.service';
import { UsersComponent } from 'app/views/me/users/users.component';

@NgModule({
  imports: [
    CommonModule,
    MeRoutingModule,
    ComponentsModule
  ],
  declarations: [MeComponent, MeRegisterComponent, UsersComponent],
  providers: [MeService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MeModule { }
