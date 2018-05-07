import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'app/app.routing';
import { LoggingService } from 'app/tools/analytics.service';
import { BusService } from 'app/tools/bus.service';
import { ComponentsModule } from 'app/tools/components/components.module';
import { MyErrorHandler } from 'app/tools/custom-error';
import { ErrorInterceptor, Interceptor, JWTInterceptor } from 'app/tools/interceptor.service';
import { MessagesService } from 'app/tools/messages.service';
import { SecurityService } from 'app/tools/security.service';
import { AppComponent } from './app.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
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
    { provide: ErrorHandler, useClass: MyErrorHandler, deps: [LoggingService] },
    { provide: LOCALE_ID, useValue: 'es-ES' },
    MessagesService,
    SecurityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
