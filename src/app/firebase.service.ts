import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Message} from './message';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirebaseService {

  constructor(private db: AngularFireDatabase) { }

  getMessages(): Observable<any[]> {
    return this.db.list('/messages').valueChanges();
  }
}
