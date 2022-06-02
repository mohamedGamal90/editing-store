import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from './auth.model';
import { DataControlService } from '../main-page/data-control.service';
// import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  value = 0;
  constructor(
    private http: HttpClient,
    private router: Router,
    private dataControl: DataControlService
  ) {}
  private Key: string = 'AIzaSyAXKzS7OtJIZq_pS-0zAlYYYG0uMnduaQs';
  loginURL: string =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
    this.Key;

  loginHandler(email: string, password: string) {
    this.dataControl.sendnewMessageHandler('');
    this.dataControl.changeloadingMode(true);
    this.http
      .post<auth>(this.loginURL, {
        email,
        password,
        returnSecureToken: true,
      })
      .subscribe(
        (response) => {
          this.userData(response);
          this.dataControl.changeloadingMode(false);
          this.router.navigate(['main']);
        },
        (error) => {
          this.errorHandler(error.error.error.message);
        }
      );
  }
  logoutHandler() {
    this.router.navigate(['../']);
    this.userData({
      idToken: '',
      email: '',
      refreshToken: '',
      expiresIn: '',
      localId: '',
      registered: false,
    });
  }

  private userData(user: auth) {
    const token: string = user.idToken;
    const email: string = user.email;
    const refreshToken: string = user.refreshToken;
    const expiresIn: number = +user.expiresIn * 1000;
    const localId: string = user.localId;
    this.value = expiresIn;
  }

  private errorHandler(error: string) {
    let errorMessage = 'An unknown error occurred!';
    switch (error) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    this.dataControl.sendnewMessageHandler(errorMessage);
    this.dataControl.changeloadingMode(false);
  }
}
