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
  HttpEvent, HttpHeaders, HttpRequest, HttpResponse,
  HttpInterceptor, HttpHandler
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';

import { RequestCache } from '../request-cache.service';
import { searchUrl } from '../package-search/package-search.service';


/**
 * If request is cacheable (e.g., package search) and
 * response is in cache return the cached response as observable.
 * If has 'x-refresh' header that is true,
 * then also re-run the package search, using response from next(),
 * returning an observable that emits the cached response first.
 *
 * If not in cache or not cacheable,
 * pass request through to next()
 */
@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCache) {} // /http#using-interceptors-for-caching

  intercept(req: HttpRequest<any>, next: HttpHandler) { // /http#using-interceptors-for-caching
    // continue if not cacheable.
    if (!isCacheable(req)) { return next.handle(req); }

    const cachedResponse = this.cache.get(req);
    // cache-then-refresh // https://angular.io/guide/http#using-interceptors-to-request-multiple-values
    if (req.headers.get('x-refresh')) {
      const results$ = sendRequest(req, next, this.cache);
      return cachedResponse ?
        results$.pipe( startWith(cachedResponse) ) :
        results$;
    }
    // cache-or-fetch // https://angular.io/guide/http#using-interceptors-to-request-multiple-values
    return cachedResponse ?
      of(cachedResponse) : sendRequest(req, next, this.cache);
  }
}


/** Is this request cacheable? */
function isCacheable(req: HttpRequest<any>) {
  // Only GET requests are cacheable
  return req.method === 'GET' &&
    // Only npm package search is cacheable in this app
    -1 < req.url.indexOf(searchUrl);
}

/**
 * Get server response observable by sending request to `next()`.
 * Will add the response to the cache on the way out.
 */
function sendRequest( // /http#using-interceptors-for-caching
  req: HttpRequest<any>,
  next: HttpHandler,
  cache: RequestCache): Observable<HttpEvent<any>> {

  // No headers allowed in npm search request
  const noHeaderReq = req.clone({ headers: new HttpHeaders() });

  return next.handle(noHeaderReq).pipe(
    tap(event => {
      // There may be other events besides the response.
      if (event instanceof HttpResponse) {
        cache.put(req, event); // Update the cache.
      }
    })
  );
}

