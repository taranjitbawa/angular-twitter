import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {ChatMessage} from './chatmessage';
import { Observable } from 'rxjs';

@Injectable()
export class FirebaseService {

  constructor(private db: AngularFireDatabase) { }

  getMessages(): Observable<any> {
    return this.db.list('/messages').valueChanges();
  }

  addMessage(message: ChatMessage): void {
    this.db.list('/messages').push(message);
  }
}
