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
import { DownloaderService } from './downloader.service';

@Component({
  selector: 'app-downloader',
  templateUrl: './downloader.component.html',
  providers: [ DownloaderService ]
})
export class DownloaderComponent {
  contents: string;
  constructor(private downloaderService: DownloaderService) {}

  clear() {
    this.contents = undefined;
  }

  download() { // /http#requesting-non-json-data
    this.downloaderService.getTextFile('assets/textfile.txt')
      .subscribe(results => this.contents = results);
  }
}
