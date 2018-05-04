import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {ChatMessage} from './chatmessage';
import { Observable } from 'rxjs';

@Injectable()
export class FirebaseService {

  constructor(private db: AngularFireDatabase) { }

  getMessages(): Observable<ChatMessage[]> {
    return this.db.list('/messages').valueChanges().map(
      (messages: any[]) => messages.map(m => this.mapMessage(m))
    );
  }

  mapMessage(obj): ChatMessage {
    return new ChatMessage(obj.text, obj.sender, new Date(obj.dateSent));
  }

  addMessage(message: ChatMessage): void {
    this.db.list('/messages').push(message.toJsonObject());
  }
}
