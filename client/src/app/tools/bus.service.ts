import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { IUser } from 'app/tools/user.model';
import { IMessage, Level } from 'app/tools/message.model';
import { LoggingService } from 'app/tools/analytics.service';


@Injectable()
export class BusService {

  private message$ = new Subject<IMessage>();
  private securityErr$ = new Subject<string>();
  private userToken$ = new BehaviorSubject<string>(null);
  private user$ = new BehaviorSubject<IUser>(null);
  private organization$ = new BehaviorSubject<any>(null);
  private isPrintingMode$ = new BehaviorSubject<boolean>(false);

  constructor(private log: LoggingService) { }

  getMessage$(): Observable<IMessage> {
    return this.message$.asObservable();
  }

  getSecurityErr$(): Observable<string> {
    return this.securityErr$.asObservable();
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

  emitHttpError(error) {
    this.log.sendError('Http Error', error);
    this.emit({ level: Level.ERROR, code: error.status });
  }

  emitSecurityError(error) {
    this.log.sendError('Security Error', error);
    this.emit({ level: Level.WARNING, code: error.status });
    this.securityErr$.next(error);
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
