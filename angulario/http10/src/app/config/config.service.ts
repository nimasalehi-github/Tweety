/**
 * The HttpClient service makes use of observables for all transactions.
 *  You must import the RxJS observable and operator symbols that appear in the example snippets.
 *  These ConfigService imports are typical.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ConfigClass } from './config-class';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends ConfigClass {
  constructor( private http: HttpClient ) {
    super();
  }
}
