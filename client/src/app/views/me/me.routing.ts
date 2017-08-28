import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeComponent } from 'app/views/me/me/me.component';
import { UsersComponent } from 'app/views/me/users/users.component';
import { ConfirmationComponent } from "app/views/me/confirmation/confirmation.component";

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
    path: 'users',
    component: UsersComponent,
    data: { name: 'users', title: 'Users' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeRoutingModule { }
