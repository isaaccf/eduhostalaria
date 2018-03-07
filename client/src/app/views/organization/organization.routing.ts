import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationHomeComponent } from 'app/views/organization/organization-home/organization-home.component';
import { OrganizationEventComponent } from 'app/views/organization/organization-event/organization-event.component';
import { OrganizationTermsComponent } from './organization-terms/organization-terms.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationHomeComponent,
    data: { title: 'O Centro' }
  },
  {
    path: 'terms',
    component: OrganizationTermsComponent,
    data: { title: 'O Centro' }
  },
  {
    path: 'events/:eventId',
    component: OrganizationEventComponent,
    data: { title: 'Oferta' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
