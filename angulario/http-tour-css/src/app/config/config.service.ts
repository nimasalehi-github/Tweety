import { Config } from './../../../../http-tour-routing-css/src/app/config/config';
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

import { Injectable } from '@angular/core'; //

import { Observable, throwError, from, config } from 'rxjs'; // http#setup-for-server-communication
import { catchError, retry } from 'rxjs/operators'; // http#setup-for-server-communication

import { HttpClient } from '@angular/common/http'; // http#setup-for-server-communication
@Injectable({ //
  providedIn: 'root'
})
export class ConfigService { //
  configUrl = '/config.json'; // /http#requesting-a-typed-response
  constructor(private http: HttpClient) { } // http#setup-for-server-communication

  getConfig() { // /http#requesting-a-typed-response
    // now returns an Observable of Config
    return this.http.get<Config>(this.configUrl);
  }
}
