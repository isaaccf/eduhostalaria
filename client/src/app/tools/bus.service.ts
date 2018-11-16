import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggingService } from 'app/tools/analytics.service';
import { IMessage, Level } from 'app/tools/message.model';
import { IUser } from 'app/tools/user.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class BusService {
  private message$ = new Subject<IMessage>();
  private tokenErr$ = new BehaviorSubject<string>(null);
  private userToken$ = new BehaviorSubject<string>(null);
  private user$ = new BehaviorSubject<IUser>(null);
  private organization$ = new BehaviorSubject<any>(null);
  private isPrintingMode$ = new BehaviorSubject<boolean>(false);

  constructor(private log: LoggingService) {}

  getMessage$(): Observable<IMessage> {
    return this.message$.asObservable();
  }

  getTokenErr$(): Observable<string> {
    return this.tokenErr$.asObservable();
  }

  getUser$(): Observable<IUser> {
    return this.user$.asObservable();
  }

  getUserToken$(): Observable<string> {
    return this.userToken$.asObservable();
  }

  getOrganization$(): Observable<any> {
    return this.organization$.asObservable();
  }

  getIsPrintingMode$(): Observable<boolean> {
    return this.isPrintingMode$.asObservable();
  }

  emit(message: IMessage) {
    message.timestamp = new Date();
    this.message$.next(message);
  }

  emitHttpError(error: HttpErrorResponse) {
    this.emit({ level: Level.ERROR, code: error.statusText });
  }

  emitTokenError(error: HttpErrorResponse) {
    this.tokenErr$.next(error.message);
    this.emit({ level: Level.WARNING, code: error.statusText });
  }

  emitUser(user: IUser) {
    this.user$.next(user);
  }

  emitUserToken(userToken: string) {
    this.userToken$.next(userToken);
  }

  emitOrganization(organization: any) {
    this.organization$.next(organization);
  }

  emitIsPrintingMode(isPrintingMode: boolean) {
    this.isPrintingMode$.next(isPrintingMode);
  }
}
