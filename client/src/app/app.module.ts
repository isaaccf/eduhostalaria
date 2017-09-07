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
import { AppRoutingModule } from 'app/app.routing';

declare var ga: Function;

@Injectable()
export class LoggingService {
  public sendError(message) {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Error',
      eventAction: 'Message',
      eventLabel: message
    })
  }
}

class MyErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) { }

  handleError(error) {
    const loggingService = this.injector.get(LoggingService);
    const message = error.message ? error.message : error.toString();
    /* ["stack", "message", "rejection", "promise", "zone", "task"] */
    loggingService.sendError(message);
    // Show console error
    throw error;
  }
}

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
    LoggingService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: MyErrorHandler, deps: [Injector] },
    MessagesService,
    SecurityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
