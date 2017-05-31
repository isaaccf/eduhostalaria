import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
import { InputComponent } from './input/input.component';
import { HttpModule } from '@angular/http';
import { ControlErrorComponent } from './control-error/control-error.component';
import { FormToolsService } from 'app/core/shared/form-tools.service';
import { CounterComponent } from './counter/counter.component';
import { RouterModule } from '@angular/router';
import { TileComponent } from './tile/tile.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [ControlErrorComponent, FormComponent, InputComponent, TableComponent, CounterComponent, TileComponent],
  exports: [ControlErrorComponent, CounterComponent, FormComponent, HttpModule, InputComponent, ReactiveFormsModule],
  providers: [FormToolsService]
})
export class SharedModule { }
