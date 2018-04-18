import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeComponent } from './me/me.component';
import { ComponentsModule } from 'app/tools/components/components.module';
import { MeRoutingModule } from 'app/views/me/me.routing';
import { MeService } from 'app/views/me/me.service';
import { UsersComponent } from 'app/views/me/users/users.component';
import { OrganizationsComponent } from 'app/views/me/organizations/organizations.component';
import { OrganizationComponent } from './organization/organization.component';
import { EventsComponent } from './events/events.component';
import { EventBookingsComponent } from './event-bookings/event-bookings.component';
import { BookingsComponent } from './bookings/bookings.component';
import { EventComponent } from './event/event.component';
import { EventsUshierComponent } from './events-ushier/events-ushier.component';
import { OrganizationService } from 'app/views/organization/organization.service';
import { BookingComponent } from './booking/booking.component';
import { EventPrintComponent } from './event-print/event-print.component';

@NgModule({
  imports: [
    CommonModule,
    MeRoutingModule,
    ComponentsModule
  ],
  // tslint:disable-next-line:max-line-length
  declarations: [MeComponent, UsersComponent, OrganizationsComponent, OrganizationComponent, EventsComponent, EventBookingsComponent, BookingsComponent, EventComponent, EventsUshierComponent, BookingComponent, EventPrintComponent],
  providers: [MeService, OrganizationService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MeModule { }
