/**
 * The HttpClient service makes use of observables for all transactions.
 *  You must import the RxJS observable and operator symbols that appear in the example snippets.
 *  These ConfigService imports are typical.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ConfigClass } from './config-class';
import { ConfigInterface } from './config-interface';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ConfigService extends ConfigClass {

  constructor( private http: HttpClient ) {
    super();
  }

  configUrl = 'assets/config.json'; // /http#requesting-data-from-a-server


  getConfigResponse(): Observable<HttpResponse<ConfigInterface>> {
    return this.http.get<ConfigInterface>(
      this.configUrl, { observe: 'response' });
  }
}
