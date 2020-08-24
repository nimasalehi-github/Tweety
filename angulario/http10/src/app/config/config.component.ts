import { ConfigInterface } from './config-interface';
import { ConfigClass } from './config-class';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  config: ConfigInterface; // http#requesting-data-from-a-server
  error: any;
  headers: string[];
  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
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
}
