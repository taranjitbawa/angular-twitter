import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { ChatMessage } from './chatmessage';
import { MatMenu } from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FirebaseService]
})
export class AppComponent implements OnInit {
  title = 'app';
  tweetInput = '';
  messages: Observable<any>;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.getStuff();
  }

  getStuff(): void {
    this.messages = this.firebaseService.getMessages();
  }

  postNewMessage(): void {
    const newMessage = new ChatMessage(this.tweetInput);
    this.firebaseService.addMessage(newMessage);
    this.tweetInput = '';
  }
}
