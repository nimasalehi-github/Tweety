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

 /* "Barrel" of Http Interceptors */ // https://angular.io/guide/http#provide-the-interceptor
import { HTTP_INTERCEPTORS } from '@angular/common/http'; // https://angular.io/guide/http#provide-the-interceptor

import { AuthInterceptor } from './auth-interceptor';
import { CachingInterceptor } from './caching-interceptor';
import { EnsureHttpsInterceptor } from './ensure-https-interceptor';
import { LoggingInterceptor } from './logging-interceptor';
import { NoopInterceptor } from './noop-interceptor'; // https://angular.io/guide/http#provide-the-interceptor
import { TrimNameInterceptor } from './trim-name-interceptor';
import { UploadInterceptor } from './upload-interceptor';


/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [ // https://angular.io/guide/http#provide-the-interceptor
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },

  { provide: HTTP_INTERCEPTORS, useClass: EnsureHttpsInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TrimNameInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: UploadInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },

];
