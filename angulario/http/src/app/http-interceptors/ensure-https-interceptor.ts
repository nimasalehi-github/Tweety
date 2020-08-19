/**
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
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class EnsureHttpsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // clone request and replace 'http://' with 'https://' at the same time
    const secureReq = req.clone({ // https://angular.io/guide/http#handling-interceptor-events
      url: req.url.replace('http://', 'https://')
    });
    // send the cloned, "secure" request to the next handler.
    return next.handle(secureReq); // https://angular.io/guide/http#handling-interceptor-events
  }
}
