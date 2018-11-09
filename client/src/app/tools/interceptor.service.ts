import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { LoggingService } from './analytics.service';
import { BusService } from './bus.service';
import { HTTP_STATUS } from './http-status.enum';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let url: string;
    if (req.url.includes('assets/')) {
      url = `${environment.assetsUrl}${req.url}`;
    } else {
      url = `${environment.apiUrl}${req.url}`;
    }
    req = req.clone({
      url: url
    });
    return next.handle(req);
  }
}

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  private authorization;

  constructor(private bus: BusService) {
    this.subscribeToTokenChanges();
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: this.authorization
      }
    });
    return next.handle(req);
  }

  private subscribeToTokenChanges() {
    this.bus
      .getUserToken$()
      .subscribe(token => (this.authorization = 'Bearer ' + token));
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private bus: BusService, private log: LoggingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap<HttpEvent<any>>(null, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.onCatch(err);
        }
      })
    );
  }

  private onCatch(err: HttpErrorResponse) {
    if (this.isSecurityError(err)) {
      this.log.sendEvent(
        'ErrorInterceptor',
        'isSecurityError',
        'localStorage.clear'
      );
      localStorage.clear();
      this.bus.emitSecurityError(err);
    } else {
      this.bus.emitHttpError(err);
    }
  }

  private isSecurityError(err: HttpErrorResponse) {
    return (
      err.status === HTTP_STATUS.UNAUTHORIZED ||
      err.status === HTTP_STATUS.AUTHENTICATION_TIMEOUT
    );
  }
}
