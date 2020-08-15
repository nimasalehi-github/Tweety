/** https://angular.io/guide/http#requesting-data-from-a-server
 *    Requesting a typed response
 *        assets/config.json
 *        app/config/config.service.ts (getConfig v.1)
 *        app/config/config.component.ts (showConfig v.1)
 *    Reading the full response
 *        app/config/config.service.ts (getConfig v.2)
 *        app/config/config.component.ts (showConfig v.2)
 *        app/config/config.component.ts (showConfigResponse)
 *    Making a JSONP request
 *    Requesting non-JSON data
 *        app/downloader/downloader.service.ts (getTextFile)
 *        app/downloader/downloader.component.ts (download)
 */

import { Component } from '@angular/core';
import { Config, ConfigService } from './config.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  providers: [ ConfigService ],
  styles: ['.error {color: red;}']
})
export class ConfigComponent {
  error: any;
  headers: string[];
  config: Config; // http#requesting-data-from-a-server

  constructor(private configService: ConfigService) {}

  clear() {
    this.config = undefined;
    this.error = undefined;
    this.headers = undefined;
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe(
        (data: Config) => this.config = { ...data }, // success path
        error => this.error = error // error path
      );
  }

  showConfig_v1() {
    this.configService.getConfig_1()
      .subscribe((data: Config) => this.config = {
          heroesUrl: data['heroesUrl'],
          textfile:  data['textfile']
      });
  }

  showConfig_v2() {
    this.configService.getConfig()
      // clone the data object, using its known Config shape
      .subscribe((data: Config) => this.config = { ...data });  // /http#requesting-data-from-a-server
                                                                // /http#requesting-a-typed-response
  }

  showConfigResponse() {                        // /http#reading-the-full-response
    this.configService.getConfigResponse()      // /http#requesting-data-from-a-server
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        this.config = { ... resp.body };
      });
  }
  makeError() {
    this.configService.makeIntentionalError().subscribe(null, error => this.error = error );
  }
}
