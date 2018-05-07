import { BusService } from './bus.service';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpResponse, HttpEvent, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { HTTP_STATUS } from './http-status.enum';
import { tap } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url: string;
    if (req.url.includes('assets/')) {
      url = `${environment.assetsUrl}${req.url}`;
    } else {
      url = `${environment.apiUrl}${req.url}`;
    }
    req = req.clone({
      url: url
    })
    return next.handle(req);
  }
}

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  private authorization;

  constructor(private bus: BusService) {
    this.subscribeToTokenChanges();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
      .subscribe(token => this.authorization = 'Bearer ' + token);
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private bus: BusService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap<HttpEvent<any>>(((err: any) => {
          if (err instanceof HttpErrorResponse) {
            this.onCatch(err);
          }
        }))
      )
  }

  private onCatch(err: HttpErrorResponse) {
    if (this.isSecurityError(err)) {
      this.bus.emitSecurityError(err);
    } else {
      this.bus.emitHttpError(err);
    }
  }

  private isSecurityError(err: HttpErrorResponse) {
    return (
      err.status === HTTP_STATUS.UNAUTHORIZED ||
      err.status === HTTP_STATUS.AUTHENTICATION_TIMEOUT);
  }

  private isNotAllowed(err: HttpErrorResponse) {
    return err.status === HTTP_STATUS.FORBIDDEN;
  }

}
