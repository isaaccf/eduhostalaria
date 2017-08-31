import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login.routing';
import { LoginComponent } from './login/login.component';
import { ComponentsModule } from 'app/tools/components/components.module';
import { RegisterComponent } from './register/register.component';


@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ComponentsModule
  ],
  declarations: [LoginComponent, RegisterComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LoginModule { }
