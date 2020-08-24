import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConfigComponent } from './config/config.component';

import { HttpClientModule } from '@angular/common/http';
import { DownloaderComponent } from './downloader/downloader.component';
/** https://angular.io/guide/http#setup-for-server-communication
 *  Before you can use HttpClient,
 *  you need to import the Angular HttpClientModule.
 *  Most apps do so in the root AppModule.
 */

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    DownloaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // import HttpClientModule after BrowserModule.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
