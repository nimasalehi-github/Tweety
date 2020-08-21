/** https://angular.io/guide/http#security-xsrf-protection
 *     https://angular.io/guide/http#configuring-custom-cookieheader-names
*/
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

/** https://angular.io/guide/http#setup-for-server-communication
 *    app/app.module.ts (excerpt)
 *    app/config/config.service.ts (excerpt)
 *    app/config/config.service.ts (RxJS imports)
 */
import { NgModule }         from '@angular/core'; // http#setup-for-server-communication
import { BrowserModule }    from '@angular/platform-browser'; // http#setup-for-server-communication
import { FormsModule }      from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // http#setup-for-server-communication
import { HttpClientXsrfModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { RequestCache, RequestCacheWithMap } from './request-cache.service';

import { AppComponent }         from './app.component';
import { AuthService }          from './auth.service';
import { ConfigComponent }      from './config/config.component';
import { DownloaderComponent }  from './downloader/downloader.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HttpErrorHandler }     from './http-error-handler.service';
import { MessageService }       from './message.service';
import { MessagesComponent }    from './messages/messages.component';
import { PackageSearchComponent } from './package-search/package-search.component';
import { UploaderComponent }    from './uploader/uploader.component';

import { httpInterceptorProviders } from './http-interceptors/index';

@NgModule({
  imports: [
    BrowserModule, // http#setup-for-server-communication
    FormsModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule, // http#setup-for-server-communication
    HttpClientXsrfModule.withOptions({ // https://angular.io/guide/http#security-xsrf-protection
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {
        dataEncapsulation: false,
        passThruUnknownUrl: true,
        put204: false // return entity after PUT/update
      }
    )
  ],
  declarations: [
    AppComponent, // http#setup-for-server-communication
    ConfigComponent,
    DownloaderComponent,
    HeroesComponent,
    MessagesComponent,
    UploaderComponent,
    PackageSearchComponent,
  ],
  providers: [
    AuthService,
    HttpErrorHandler,
    MessageService,
    { provide: RequestCache, useClass: RequestCacheWithMap },
    httpInterceptorProviders // https://angular.io/guide/http#provide-the-interceptor
  ],
  bootstrap: [ AppComponent ] // http#setup-for-server-communication
})
export class AppModule {} // http#setup-for-server-communication
