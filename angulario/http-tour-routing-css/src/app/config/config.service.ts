/** https://angular.io/guide/http#setup-for-server-communication
 *    app/app.module.ts (excerpt)
 *    app/config/config.service.ts (excerpt)
 *    app/config/config.service.ts (RxJS imports)
 */

 import { Injectable } from '@angular/core';

 import { HttpClient } from '@angular/common/http'; // /http#setup-for-server-communication
 import { Observable, throwError } from 'rxjs'; // /http#setup-for-server-communication
 import { catchError, retry } from 'rxjs/operators'; // /http#setup-for-server-communication

 @Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient) { } // /http#setup-for-server-communication
}
