import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home.routing';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from 'app/tools/components/components.module';
import { HomeService } from "app/views/home/home.service";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentsModule
  ],
  declarations: [HomeComponent],
  providers: [HomeService],
  exports: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
