import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'app/views/home/home/home.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  data: { name: 'home', title: 'Hostelaría' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
