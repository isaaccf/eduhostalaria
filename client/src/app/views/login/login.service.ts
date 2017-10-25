import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  private credentialsUrl = 'credentials';
  private usersUrl = 'home/users';

  constructor(private http: HttpClient) { }

  getUserById(userId) {
    return this.http.get(`${this.usersUrl}/${userId}`);
  }

  restorePassword(email) {
    return this.http.post(`${this.credentialsUrl}/forgot-password`, email);
  }

}
