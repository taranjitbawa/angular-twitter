import { Injectable, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { FirebaseService } from './firebase.service';
import { Router } from '@angular/router';
import { CookieService } from './cookie.service';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedInUserSubject: Subject<User[]>;
  private loggedInUser: User;

  public USER_COOKIE_NAME = 'login_username';

  constructor(private firebaseService: FirebaseService,
    private cookieService: CookieService) {
      this.loggedInUserSubject = new Subject();
    }

  login(user: string) {
    this.loggedInUserSubject.subscribe(e => {
      if (e.length) {
        this.loggedInUser = e[0];
      }
    });

    this.firebaseService.getUser(user).subscribe(e => {
      if (e.length) {
        this.loggedInUserSubject.next(e);
        this.cookieService.put(this.USER_COOKIE_NAME, user);
      } else {
        this.loggedInUserSubject.next([]);
      }
    });
  }

  logout() {
    this.cookieService.put(this.USER_COOKIE_NAME, '');
    this.loggedInUserSubject.next([]);
  }

  create(user: User) {
    this.firebaseService.createUser(user);
  }

  exists(user: string): Observable<boolean> {
    return this.firebaseService.getUser(user).map(m => m.length > 0);
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedInUserSubject.map(m => m.length > 0);
  }

  get currentUser(): User {
    return this.loggedInUser;
  }
}
