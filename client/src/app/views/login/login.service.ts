import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  private credentialsUrl = 'credentials';

  constructor(private http: HttpClient) { }

  restorePassword(email) {
    console.log(email);
    return this.http.post(`${this.credentialsUrl}/forgot-password`, email);
  }

}
