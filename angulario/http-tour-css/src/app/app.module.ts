/** https://angular.io/guide/http#setup-for-server-communication
 *    app/app.module.ts (excerpt)
 *    app/config/config.service.ts (excerpt)
 *    app/config/config.service.ts (RxJS imports)
 */

import { BrowserModule } from '@angular/platform-browser'; //
import { NgModule } from '@angular/core'; //

import { HttpClientModule } from '@angular/common/http'; // /http#setup-for-server-communication

import { AppComponent } from './app.component';
import { ConfigComponent } from './config/config.component';

@NgModule({ //
  declarations: [
    AppComponent,
    ConfigComponent //
  ],
  imports: [
    BrowserModule, //
    //
    HttpClientModule, // /http#setup-for-server-communication
  ],
  providers: [],
  bootstrap: [AppComponent] //
})
export class AppModule { } //
