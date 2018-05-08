import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { ChatMessage } from '../classes/chatmessage';
import { UserService } from '../services/user.service';
import { CookieService } from '../services/cookie.service';


@Component({
  selector: 'app-twitter-form',
  templateUrl: './twitter-form.component.html',
  styleUrls: ['./twitter-form.component.css'],
  providers: [FirebaseService]
})

export class TwitterFormComponent implements OnInit {
  title = 'app';
  tweetInput = '';
  remainingChar = 240;
  messages: Observable<ChatMessage[]>;

  isLoggedIn: boolean;

  constructor(private firebaseService: FirebaseService,
    private userService: UserService,
    private cookieService: CookieService) {}

  ngOnInit(): void {
    const currentUser = this.cookieService.get(this.userService.USER_COOKIE_NAME);
    this.userService.login(currentUser);
    this.userService.isLoggedIn.subscribe(e => this.isLoggedIn = e);
    this.getStuff();
  }

  get username() {
    return this.userService.currentUser ?
      this.userService.currentUser.name :
      'null';
  }

  get color() {
    return this.userService.currentUser ?
      this.userService.currentUser.color :
      '000000';
  }

  get formattedColor() {
    return '#' + (this.userService.currentUser ?
      this.userService.currentUser.color :
      '000000');
  }

  getStuff(): void {
    this.messages = this.firebaseService.getMessages();
  }

  postNewMessage(twitterForm: any): void {
    console.log(this.color);
    const newMessage = new ChatMessage(this.tweetInput,
      this.username, this.color, new Date());
    this.firebaseService.addMessage(newMessage);
    twitterForm.reset();
  }

  showRemainChar(): void {
    this.remainingChar = 240 - this.tweetInput.length;
  }

  isOwner(msg: ChatMessage): boolean {
    return msg.sender === this.userService.currentUser.name;
  }
}
