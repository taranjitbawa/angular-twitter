import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { CookieService } from 'angular2-cookie/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public isLoggedIn = false;

  constructor(private userService: UserService,
    private cookieService: CookieService) {}
  ngOnInit() {
    const currentUser = this.cookieService.get(this.userService.USER_COOKIE_NAME);
    this.userService.login(currentUser);

    this.userService.isLoggedIn.subscribe(e => this.isLoggedIn = e);
  }
}
