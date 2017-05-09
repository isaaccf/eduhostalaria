import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './forms/error/error.component';
import { ControlComponent } from './forms/control/control.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ErrorComponent, ControlComponent]
})
export class SharedModule { }
