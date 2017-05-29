import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
import { InputComponent } from './input/input.component';
import { HttpModule } from '@angular/http';
import { ControlErrorComponent } from './control-error/control-error.component';
import { FormToolsService } from 'app/core/shared/form-tools.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
  ],
  declarations: [ControlErrorComponent, FormComponent, InputComponent, TableComponent],
  exports: [ControlErrorComponent, FormComponent, HttpModule, InputComponent, ReactiveFormsModule],
  providers: [FormToolsService]
})
export class SharedModule { }
