import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client/client.component';
import { ClientBookingsComponent } from './client-bookings/client-bookings.component';
import { ClientBookingsEditComponent } from './client-bookings-edit/client-bookings-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule
  ],
  declarations: [ClientComponent, ClientBookingsComponent, ClientBookingsEditComponent]
})
export class ClientModule { }