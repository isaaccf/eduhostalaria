import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BusService } from './bus.service';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { IUser } from 'app/tools/user.model';
import { Level } from 'app/tools/message.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class SecurityService {
  private userTokenKey = 'userToken';
  private userKey = 'user';
  private organizationKey = 'organization';
  private url = 'credentials';
  private userUrl = '_/users';
  private organizationUrl = '_/organizations';

  constructor(private bus: BusService, private http: HttpClient, private router: Router) {
    this.onSecurityErrLogOut();
    this.emitUserStatus();
  }

  logInUser(credentials: IUserCredential) {
    this.http
      .post(this.url, credentials)
      .subscribe(r => {
        this.saveUserToken(r);
        this.getMe()
          .subscribe(this.emitLogin.bind(this));
      });
  }

  logOutUser() {
    localStorage.removeItem(this.userTokenKey);
    this.bus.emitUserToken(null);
    localStorage.removeItem(this.userKey);
    this.bus.emitUser(null);
    localStorage.removeItem(this.organizationKey);
    this.bus.emitOrganization(null);
    this.bus.emit({ level: Level.SUCCESS, code: 'logout' });
    this.navigateTo(['/']);
    window.location.reload();
  }

  checkBigbang() {
    this.http
      .get(`${this.url}/bigbang`)
      .subscribe(r => this.checkMe());
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
    return this.http
      .get<IUser>(`${this.userUrl}/me`)
      .do(this.saveUser.bind(this))
      .do(this.getOrganization.bind(this));
  }

  private onSecurityErrLogOut() {
    this.bus
      .getSecurityErr$()
      .subscribe(err => this.logOutUser());
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
    this.navigateTo(['/me']);
  }

  navigateTo(target: any, args?: any) {
    this.router.navigate(target);
  }

  confirmInvitation(credentials: IInvitationCredential) {
    this.http
      .post(`${this.url}/confirmations`, credentials)
      .subscribe(
      r => {
        this.saveUserToken(r);
        this.getMe()
          .subscribe(this.emitLogin.bind(this));
      },
      error => {
        this.navigateTo(['/login']);
      });
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
