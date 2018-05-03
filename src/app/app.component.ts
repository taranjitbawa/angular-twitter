import { Component, OnInit } from '@angular/core';
import { SolrService } from './solr.service';
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

  constructor(private solrService: SolrService) {}

  ngOnInit(): void {
    this.getStuff();
  }

  getStuff(): void {
    this.solrService.query({q: '*:*', fq: ''}).subscribe(data => this.messages = data);
  }
}
