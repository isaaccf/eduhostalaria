import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentsModule } from 'app/tools/components/components.module';
import { HomeService } from 'app/views/home/home.service';
import { HomeRoutingModule } from './home.routing';
import { HomeComponent } from './home/home.component';


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
