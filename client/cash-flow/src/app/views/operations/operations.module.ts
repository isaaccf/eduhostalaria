import { OperationsService } from './data/operations.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsComponent } from './operations.component';
import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';
import { RowComponent } from './list/row/row.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OperationsRoutingModule
  ],
  declarations: [OperationsComponent, NewComponent, ListComponent, RowComponent],
  providers: [OperationsService]
})
export class OperationsModule { }
