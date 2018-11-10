import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoggingService } from 'app/tools/analytics.service';
import { Level } from 'app/tools/message.model';
import { IUser } from 'app/tools/user.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BusService } from './bus.service';

@Injectable()
export class SecurityService {
  private userTokenKey = 'userToken';
  private userKey = 'user';
  private organizationKey = 'organization';
  private url = 'credentials';
  private userUrl = '_/users';
  private organizationUrl = '_/organizations';

  constructor(
    private bus: BusService,
    private http: HttpClient,
    private router: Router,
    private log: LoggingService
  ) {
    this.onSecurityErrLogOut();
    this.emitUserStatus();
  }

  logInUser(credentials: IUserCredential) {
    this.http.post(this.url, credentials).subscribe(r => {
      this.log.sendEvent(
        'users',
        'login',
        credentials ? credentials.email : ''
      );
      this.saveUserToken(r);
      this.getMe().subscribe(this.emitLogin.bind(this));
    });
  }

  logOutUser(route: string = '/') {
    this.bus.emitUser(null);
    this.bus.emitUserToken(null);
    this.bus.emitOrganization(null);
    const user = this.getLocalUser();
    this.log.sendEvent('users', 'logout', user ? user.email : '');
    localStorage.removeItem(this.userTokenKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.organizationKey);
    this.bus.emit({ level: Level.SUCCESS, code: 'logout' });
    this.navigateTo([route]);
    // window.location.reload();
  }

  checkBigbang() {
    this.http.get(`${this.url}/bigbang`).subscribe(r => this.checkMe());
  }

  checkMe() {
    if (this.getUserFromLocalStorage()) {
      this.getMe().subscribe(user => {
        if (!user) {
          this.logOutUser();
        }
      });
    }
  }

  public getLocalUser() {
    return JSON.parse(localStorage.getItem(this.userKey));
  }
  public getLocalOrganization() {
    return JSON.parse(localStorage.getItem(this.organizationKey));
  }
  public setLocalOrganization(organization) {
    localStorage.setItem(this.organizationKey, JSON.stringify(organization));
    this.bus.emitOrganization(organization);
  }

  public getMe(): Observable<IUser> {
    return this.http.get<IUser>(`${this.userUrl}/me`).pipe(
      tap(this.saveUser.bind(this)),
      tap(this.getOrganization.bind(this))
    );
  }

  private onSecurityErrLogOut() {
    this.bus.getSecurityErr$().subscribe(err => {
      if (!err) {
        return;
      }
      this.logOutUser('/login');
    });
  }

  private emitUserStatus() {
    const userToken: string = localStorage.getItem(this.userTokenKey);
    this.bus.emitUserToken(userToken);
    const user = this.getUserFromLocalStorage();
    this.bus.emitUser(user);
  }

  private getUserFromLocalStorage() {
    let user: IUser = null;
    const userStorage = localStorage.getItem(this.userKey);
    if (userStorage) {
      user = JSON.parse(userStorage);
    }
    return user;
  }

  private saveUserToken(response) {
    const userToken: string = response.user_token;
    localStorage.setItem(this.userTokenKey, userToken);
    this.bus.emitUserToken(userToken);
  }

  private saveUser(user: any) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.bus.emitUser(user);
  }

  private getOrganization(user: any) {
    if (user.organizationId) {
      this.http
        .get(`${this.organizationUrl}/${user.organizationId}`)
        .subscribe(organization => {
          this.setLocalOrganization(organization);
        });
    }
  }

  private emitLogin(user) {
    this.bus.emitUser(user);
    this.bus.emit({ level: Level.SUCCESS, code: 'login', text: user.name });
    this.navigateTo(['/']);
  }

  navigateTo(target: any, args?: any) {
    this.router.navigate(target);
  }

  confirmInvitation(credentials: IInvitationCredential) {
    this.http.post(`${this.url}/confirmations`, credentials).subscribe(
      r => {
        this.log.sendEvent('users', 'confirm', JSON.stringify(credentials));
        this.saveUserToken(r);
        this.getMe().subscribe(this.emitLogin.bind(this));
      },
      error => {
        this.navigateTo(['/login']);
      }
    );
  }
}

export interface IUserCredential {
  email: string;
  password: string;
}

export interface IInvitationCredential {
  _id: string;
  password: string;
  passwordBis: string;
}
