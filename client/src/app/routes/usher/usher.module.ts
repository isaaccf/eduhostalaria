import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsherRoutingModule } from './usher-routing.module';
import { UsherComponent } from './usher/usher.component';
import { UsherEventsComponent } from './usher-events/usher-events.component';
import { UsherEventsBookingsComponent } from './usher-events-bookings/usher-events-bookings.component';
import { UsherHomeComponent } from './usher-home/usher-home.component';

@NgModule({
  imports: [
    CommonModule,
    UsherRoutingModule
  ],
  declarations: [UsherComponent, UsherEventsComponent, UsherEventsBookingsComponent, UsherHomeComponent]
})
export class UsherModule { }
