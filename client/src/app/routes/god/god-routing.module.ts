import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GodHomeComponent } from 'app/routes/god/god-home/god-home.component';
import { GodOrganizationsComponent } from 'app/routes/god/god-organizations/god-organizations.component';

const routes: Routes = [
  {
    path: '',
    component: GodHomeComponent
  },
  {
    path: 'organizations',
    component: GodOrganizationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GodRoutingModule { }
