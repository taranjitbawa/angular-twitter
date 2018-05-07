import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { FirebaseService } from './firebase.service';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedInUser: User;

  public USER_COOKIE_NAME = 'login_username';

  constructor(private firebaseService: FirebaseService,
    private cookieService: CookieService) { }

  login(user: string) {
    const userObj = this.firebaseService.getUser(user).subscribe(e => {
      this.loggedInUser = e[0];
      this.cookieService.put(this.USER_COOKIE_NAME, user);
    });
  }

  create(user: User) {
    this.firebaseService.createUser(user);
  }

  exists(user: string): Observable<boolean> {
    return this.firebaseService.getUser(user).map(m => m.length > 0);
  }

  get isLoggedIn(): boolean {
    return !!this.loggedInUser;
  }

  get currentUser(): User {
    return this.loggedInUser;
  }
}
