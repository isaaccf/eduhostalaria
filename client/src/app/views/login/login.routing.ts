import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, Router, ActivatedRoute } from '@angular/router';
import { LoginComponent } from 'app/views/login/login/login.component';
import { RegisterComponent } from 'app/views/login/register/register.component';
import { ForgotComponent } from 'app/views/login/forgot/forgot.component';
import { ConfirmationComponent } from 'app/views/login/confirmation/confirmation.component';


const routes: Routes = [{
  path: '',
  component: LoginComponent,
  data: { name: 'login', title: 'Entrada' }
},
{
  path: 'confirm/:user_id',
  component: ConfirmationComponent,
  data: { name: 'me_confirmation', title: 'Confirmación de conta' }
},
{
  path: 'forgot-password',
  component: ForgotComponent,
  data: { name: 'forgot', title: 'Recuperar contrasinal' }
},
{
  path: 'register',
  component: RegisterComponent,
  data: { name: 'register', title: 'Rexistro' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }

