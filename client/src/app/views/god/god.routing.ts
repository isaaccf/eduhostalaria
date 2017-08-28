import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GodOrganizationsComponent } from 'app/views/god/god-organizations/god-organizations.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'organizations',
    pathMatch: 'full'
  },
  {
    path: 'organizations',
    component: GodOrganizationsComponent,
    data: { name: 'god_organizations', title: 'Organizations' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GodRoutingModule { }
