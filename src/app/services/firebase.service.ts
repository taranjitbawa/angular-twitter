import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ChatMessage } from '../classes/chatmessage';
import { User } from '../classes/user';
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
    return new ChatMessage(obj.text, obj.sender, obj.color, new Date(obj.dateSent));
  }

  mapUser(obj): User {
    return new User(obj.name, obj.email, obj.color);
  }

  addMessage(message: ChatMessage): void {
    this.db.list('/messages').push(message.toJsonObject());
  }

  createUser(newUser: User): void {
    this.db.list('/users').push(newUser.toJsonObject());
  }

  getUser(name: string): Observable<User[]> {
    return this.db.list('/users',
      ref => ref.orderByChild('name').equalTo(name)).valueChanges().map(
        (user: any[]) => user.map(u => this.mapUser(u))
      );
  }
}
