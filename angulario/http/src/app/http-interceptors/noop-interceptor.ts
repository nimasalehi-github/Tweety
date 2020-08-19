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
import { // /http#write-an-interceptor
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs'; // /http#write-an-interceptor

/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): // /http#write-an-interceptor
    Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}
