import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { CookieService } from 'angular2-cookie/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public isLoggedIn = false;

  constructor(private userService: UserService,
    private cookieService: CookieService,
    private router: Router) {}
  ngOnInit() {
    const currentUser = this.cookieService.get(this.userService.USER_COOKIE_NAME);
    this.userService.login(currentUser);

    this.userService.isLoggedIn.subscribe(e => {
      this.isLoggedIn = e;
      if (e) {
        this.router.navigateByUrl('/twitter');
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }
}
