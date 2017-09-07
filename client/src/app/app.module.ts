import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, ErrorHandler, Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ComponentsModule } from 'app/tools/components/components.module';
import { BusService } from 'app/tools/bus.service';
import { SecurityService } from 'app/tools/security.service';
import { Interceptor, JWTInterceptor, ErrorInterceptor } from 'app/tools/interceptor.service';
import { MessagesService } from 'app/tools/messages.service';
import { LoggingService } from 'app/tools/analytics.service';
import { MyErrorHandler } from 'app/tools/custom-error';
import { AppRoutingModule } from 'app/app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ComponentsModule,
    HttpClientModule,
    HttpModule,
  ],
  providers: [
    BusService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: MyErrorHandler, deps: [LoggingService] },
    MessagesService,
    SecurityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
