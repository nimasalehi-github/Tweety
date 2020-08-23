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

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends ConfigClass {

  constructor( private http: HttpClient ) {
    super();
  }

  configUrl = 'assets/config.json'; // /http#requesting-data-from-a-server

  getConfig() {
    return this.http.get(this.configUrl);
  }
  getConfigـv1() {
    return this.http.get(this.configUrl);
  }
  getConfig_v2() {
    // now returns an Observable of Config
    return this.http.get<ConfigInterface>(this.configUrl);
  }
  getConfig_v3(){}

}
