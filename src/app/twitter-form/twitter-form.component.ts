import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { ChatMessage } from '../classes/chatmessage';


@Component({
  selector: 'twitter-form',
  templateUrl: './twitter-form.component.html',
  styleUrls: ['./twitter-form.component.css'],
  providers: [FirebaseService]
})

export class TwitterFormComponent implements OnInit {
  title = 'app';
  tweetInput = '';
  username = '';
  remainingChar = 240;
  messages: Observable<ChatMessage[]>;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.getStuff();
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

  isOwner(msg: ChatMessage): boolean {
    return msg.sender === 'Ryan';
  }
}
