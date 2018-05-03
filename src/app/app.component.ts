import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FirebaseService]
})
export class AppComponent implements OnInit {
  title = 'app';

  messages: any;

  tweetInput: string;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.getStuff();
  }

  getStuff(): void {
    this.messages = this.firebaseService.getMessages();
  }

  postNewMessage(): void {

    this.tweetInput = '';

  }
}
