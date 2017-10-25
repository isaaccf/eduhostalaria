import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routeBase = './views/';
const routes: Routes = [
  {
    path: '',
    loadChildren: routeBase + 'home/home.module#HomeModule'
  },
  {
    path: 'login',
    loadChildren: routeBase + 'login/login.module#LoginModule'
  },
  {
    path: 'me',
    loadChildren: routeBase + 'me/me.module#MeModule'
  },
  {
    path: 'messages',
    loadChildren: routeBase + 'messages/messages.module#MessagesModule'
  },
  {
    path: 'org/:slug',
    loadChildren: routeBase + 'organization/organization.module#OrganizationModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
