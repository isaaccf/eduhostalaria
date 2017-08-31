import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, Router, ActivatedRoute } from '@angular/router';
import { LoginComponent } from 'app/views/login/login/login.component';
import { RegisterComponent } from "app/views/login/register/register.component";


const routes: Routes = [{
  path: '',
  component: LoginComponent,
  data: { name: 'login', title: 'Entrada' }
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

