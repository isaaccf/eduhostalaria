import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { OperationsComponent } from './operations.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: OperationsComponent,
    children: [
      {
        path: 'new',
        component: NewComponent
      },
      {
        path: 'list',
        component: ListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }
