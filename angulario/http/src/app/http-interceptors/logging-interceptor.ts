/**
 *
 * https://angular.io/guide/http#intercepting-requests-and-responses
 *  /http#write-an-interceptor
 *    app/http-interceptors/noop-interceptor.ts
 *  /http#the-next-object
 *  /http#provide-the-interceptor
 *    app/http-interceptors/index.ts
 *    app/app.module.ts (interceptor providers)
 *  /http#interceptor-order
 *  /http#handling-interceptor-events
 *    app/http-interceptors/ensure-https-interceptor.ts (excerpt)
 *    app/http-interceptors/trim-name-interceptor.ts (excerpt)
 *  /http#setting-default-headers
 *    app/http-interceptors/auth-interceptor.ts
 *  /http#using-interceptors-for-logging
 *    app/http-interceptors/logging-interceptor.ts)
 *  /http#using-interceptors-for-caching
 *    app/http-interceptors/caching-interceptor.ts)
 *  /http#using-interceptors-to-request-multiple-values
 *
 */

import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, // /http#using-interceptors-for-logging
  HttpRequest, HttpResponse
} from '@angular/common/http';

import { finalize, tap } from 'rxjs/operators'; // /http#using-interceptors-for-logging
import { MessageService } from '../message.service'; // /http#using-interceptors-for-logging

@Injectable()
export class LoggingInterceptor implements HttpInterceptor { // /http#using-interceptors-for-logging
  constructor(private messenger: MessageService) {} // /http#using-interceptors-for-logging

  intercept(req: HttpRequest<any>, next: HttpHandler) { // /http#using-interceptors-for-logging
    const started = Date.now(); // /http#using-interceptors-for-logging
    let ok: string; // /http#using-interceptors-for-logging

    // extend server response observable with logging
    return next.handle(req) // /http#using-interceptors-for-logging
      .pipe( // /http#using-interceptors-for-logging
        tap(
          // Succeeds when there is a response; ignore other events
          event => ok = event instanceof HttpResponse ? 'succeeded' : '',
          // Operation failed; error is an HttpErrorResponse
          error => ok = 'failed'
        ),
        // Log when response observable either completes or errors
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
          this.messenger.add(msg);
        })
      );
  }
}
