import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login.routing';
import { LoginComponent } from './login/login.component';
import { ComponentsModule } from 'app/tools/components/components.module';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ConfirmationComponent } from 'app/views/login/confirmation/confirmation.component';
import { LoginService } from 'app/views/login/login.service';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ComponentsModule
  ],
  declarations: [LoginComponent, ConfirmationComponent, RegisterComponent, ForgotComponent],
  providers: [LoginService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LoginModule { }
