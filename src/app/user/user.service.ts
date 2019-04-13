import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token: string;
  isAuthenticated: boolean;
  private tokenTimer: any;
  private userId: string;
  private userStatusListener = new Subject<boolean>();
  getUserStatusListener() {
    return this.userStatusListener.asObservable();
  }
  getToken() {
    return this.token;
  }
  getUserId() {
    return this.userId;
  }
  isUserAuthenticated() {
    return this.isAuthenticated;
  }
  constructor(private http: HttpClient) {}
  login(username: string, password: string) {
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        'http://localhost:3000/api/user/login',
        {
          username,
          password
        }
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.userStatusListener.next(true);
          const now = new Date();
          const expDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveUserData(token, expDate, this.userId);
        }
      });
  }
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, duration * 1000);
  }
  autoAuthUser() {
    const userInformation = this.getUserData();
    if (userInformation) {
      const now = new Date();
      const expiresIn = userInformation.expDate.getTime() - now.getTime();
      if (expiresIn > 0) {
        this.isAuthenticated = true;
        this.userId = userInformation.userId;
        this.token = userInformation.token;
        this.setAuthTimer(expiresIn / 1000);
        this.userStatusListener.next(true);
      }
    }
  }
  private getUserData() {
    const token = localStorage.getItem('token');
    const expDate = localStorage.getItem('exp');
    const userId = localStorage.getItem('userId');
    if (!token || !expDate) {
      return;
    }
    return {
      token,
      expDate: new Date(expDate),
      userId
    };
  }
  logOut() {
    this.token = null;
    this.isAuthenticated = false;
    this.userStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearUserData();
    this.userId = null;
  }
  createUser(userName: string, email: string, password: string) {
    this.http
      .post('http://localhost:3000/api/user/signup', {
        username: userName,
        email,
        password
      })
      .subscribe(response => console.log(response));
  }
  private saveUserData(token: string, expDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('exp', expDate.toISOString());
    localStorage.setItem('userId', userId);
  }
  private clearUserData() {
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
    localStorage.removeItem('userId');
  }
}
