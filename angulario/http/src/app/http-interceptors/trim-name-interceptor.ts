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
export class TrimNameInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const body = req.body;
    if (!body || !body.name ) {
      return next.handle(req);
    }
    // copy the body and trim whitespace from the name property
    const newBody = { ...body, name: body.name.trim() }; // https://angular.io/guide/http#handling-interceptor-events
    // clone request and set its body
    const newReq = req.clone({ body: newBody }); // https://angular.io/guide/http#handling-interceptor-events
    // send the cloned request to the next handler.
    return next.handle(newReq); // https://angular.io/guide/http#handling-interceptor-events
  }
}
