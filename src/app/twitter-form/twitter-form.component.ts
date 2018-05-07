import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { ChatMessage } from '../classes/chatmessage';
import { UserService } from '../services/user.service';
import { CookieService } from 'angular2-cookie/core';


@Component({
  selector: 'twitter-form',
  templateUrl: './twitter-form.component.html',
  styleUrls: ['./twitter-form.component.css'],
  providers: [FirebaseService]
})

export class TwitterFormComponent implements OnInit {
  title = 'app';
  tweetInput = '';
  remainingChar = 240;
  messages: Observable<ChatMessage[]>;

  constructor(private firebaseService: FirebaseService,
    private userService: UserService,
    private cookieService: CookieService) {}

  ngOnInit(): void {
    this.getStuff();

    const currentUser = this.cookieService.get(this.userService.USER_COOKIE_NAME);
    if (currentUser) {
      this.userService.login(currentUser);
    }
  }

  get username() {
    return this.userService.currentUser ?
      this.userService.currentUser.name :
      'null';
  }

  getStuff(): void {
    this.messages = this.firebaseService.getMessages();
  }

  postNewMessage(twitterForm: any): void {
    const newMessage = new ChatMessage(this.tweetInput, this.username, new Date());
    this.firebaseService.addMessage(newMessage);
    twitterForm.reset();
  }

  showRemainChar(): void {
    this.remainingChar = 240 - this.tweetInput.length;
  }

  loggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  isOwner(msg: ChatMessage): boolean {
    return msg.sender === this.userService.currentUser.name;
  }
}
