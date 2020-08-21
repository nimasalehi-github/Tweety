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
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloaderService {

  constructor() { }
}
