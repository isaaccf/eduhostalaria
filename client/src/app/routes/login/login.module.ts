import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'app/core/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms/forms';


@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
