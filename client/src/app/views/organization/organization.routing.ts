import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationHomeComponent } from 'app/views/organization/organization-home/organization-home.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationHomeComponent,
    data: { title: 'O Centro' }
  },
  // {
  //   path: ':id',
  //   component: OrganizationHomeComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
