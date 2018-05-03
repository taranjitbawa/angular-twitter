import { Injectable } from '@angular/core';
import { CONFIG } from './CONFIG';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import {IndexDocument} from './IndexDocument';

@Injectable()
export class SolrService {

  private baseUrl: string;


  constructor(private http: HttpClient) {
    this.baseUrl = CONFIG.solrUrl;
   }

  query(query: SolrQuery): Observable<IndexDocument[]> {
    const endpoint = this.buildUrl(query);
    console.log(endpoint);
    return this.http.get<IndexDocument[]>(endpoint).map(res => this.mapResponse(res));
  }

  private mapResponse(res): IndexDocument[] {
    return res.response.docs;
  }

  update(obj: Object | Object[]): void {
    const endpoint = this.baseUrl + '/update/json/docs';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:4200/');
    headers.append('Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding');

    const httpOptions = { headers: headers };

    this.http.post<Object>(endpoint, JSON.stringify(obj), httpOptions).subscribe(
      response => console.log(response),
      err => console.log(err)
    );
  }

  private buildUrl(query: SolrQuery): string {
    const params = [];

    for (const p in query) {
      if (query.hasOwnProperty(p)) {
        params.push(encodeURIComponent(p) + '=' + encodeURIComponent(query[p]));
      }
    }

    return this.baseUrl + '/select?' + params.join('&');
  }
}

export class SolrQuery {
  constructor(q: string, fq: string)
  constructor(public q: string, public fq: string, public sort?: string, public rows?: number) {
    this.sort = sort || 'asc';
    this.rows = rows || 10;
  }
}
