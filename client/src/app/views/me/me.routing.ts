import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeComponent } from 'app/views/me/me/me.component';
import { UsersComponent } from 'app/views/me/users/users.component';
import { ConfirmationComponent } from "app/views/me/confirmation/confirmation.component";
import { OrganizationsComponent } from "app/views/me/organizations/organizations.component";
import { OrganizationComponent } from "app/views/me/organization/organization.component";

const routes: Routes = [
  {
    path: '',
    component: MeComponent,
    data: { name: 'me', title: 'O meu perfil' }
  },
  {
    path: 'confirm/:user_id',
    component: ConfirmationComponent,
    data: { name: 'me_confirmation', title: 'Confirmación de conta' }
  },
  {
    path: 'organizations',
    component: OrganizationsComponent,
    data: { name: 'me_organizations', title: 'Centros' }
  },
  {
    path: 'organization',
    component: OrganizationComponent,
    data: { name: 'me_organization', title: 'O meu centro' }
  },
  {
    path: 'users',
    component: UsersComponent,
    data: { name: 'me_users', title: 'Usuarios' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeRoutingModule { }
