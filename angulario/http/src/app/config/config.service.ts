/** https://angular.io/guide/http#handling-request-errors
 *    https://angular.io/guide/http#getting-error-details
 *      app/config/config.service.ts (handleError)
 *      app/config/config.service.ts (getConfig v.3 with error handler)
 *    https://angular.io/guide/http#retrying-a-failed-request
 *      app/config/config.service.ts (getConfig with retry)
 */

 /** https://angular.io/guide/http#requesting-data-from-a-server
 *    Requesting a typed response
 *        assets/config.json
 *        app/config/config.service.ts (getConfig v.1)
 *        app/config/config.component.ts (showConfig v.1)
 *    Reading the full response
 *        app/config/config.service.ts (getConfig v.2)
 *        app/config/config.component.ts (showConfig v.2)
 *        app/config/config.component.ts (showConfigResponse)
 *    Making a JSONP request
 *    Requesting non-JSON data
 *        app/downloader/downloader.service.ts (getTextFile)
 *        app/downloader/downloader.component.ts (download)
 */

/** https://angular.io/guide/http#setup-for-server-communication
 *    app/app.module.ts (excerpt)
 *    app/config/config.service.ts (excerpt)
 *    app/config/config.service.ts (RxJS imports)
 */

import { Injectable } from '@angular/core'; // http#setup-for-server-communication
import { HttpClient } from '@angular/common/http'; // http#setup-for-server-communication
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs'; // http#setup-for-server-communication
import { catchError, retry } from 'rxjs/operators'; // http#setup-for-server-communication

// because the response is a plain object that cannot be automatically converted to an instance of a class.
export interface Config {           // /http#requesting-a-typed-response
  heroesUrl: string;
  textfile: string;
}

@Injectable()
export class ConfigService {
  configUrl = 'assets/config.json'; // /http#requesting-data-from-a-server

  constructor(private http: HttpClient) { } // /http#setup-for-server-communication

  getConfig() {
    return this.http.get<Config>(this.configUrl)
      .pipe( // /http#retrying-a-failed-request
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getConfig_1() {
    return this.http.get(this.configUrl); // /http#requesting-data-from-a-server
  }

  getConfig_2() {
    // now returns an Observable of Config
    return this.http.get<Config>(this.configUrl); // /http#requesting-data-from-a-server
                                                  // /http#requesting-a-typed-response
  }

  getConfig_3() { // //http#getting-error-details
    return this.http.get<Config>(this.configUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      this.configUrl, { observe: 'response' });
  }

  private handleError(error: HttpErrorResponse) { //      /http#getting-error-details

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  makeIntentionalError() {
    return this.http.get('not/a/real/url')
      .pipe(
        catchError(this.handleError)
      );
  }

}
