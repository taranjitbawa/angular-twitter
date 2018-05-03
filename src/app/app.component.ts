import { Component, OnInit } from '@angular/core';
import { SolrService, SolrQuery } from './solr.service';
import { Observable } from 'rxjs/Observable';
import {IndexDocument} from './indexDocument';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SolrService]
})
export class AppComponent implements OnInit {
  title = 'app';

  messages: IndexDocument[];

  tweetInput: string;

  constructor(private solrService: SolrService) {}

  ngOnInit(): void {
    this.getStuff();
  }

  getStuff(): void {
    const q = new SolrQuery('*:*', '');

    this.solrService.query(q).subscribe(data => this.messages = data);
  }

  postNewMessage(): void {
    const doc = new IndexDocument();

    doc.messageText = this.tweetInput;

    this.solrService.update(doc);

    this.tweetInput = '';

    this.messages.push(doc);
  }
}
