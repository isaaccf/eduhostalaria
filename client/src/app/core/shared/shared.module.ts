import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
import { InputComponent } from './input/input.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [InputComponent, FormComponent, TableComponent],
  exports: [InputComponent, FormComponent]
})
export class SharedModule { }
