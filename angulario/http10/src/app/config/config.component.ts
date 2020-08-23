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

  constructor() { }

  ngOnInit(): void {
  }


  showConfig() {
    this.configService.getConfig()
      .subscribe(
        (data: Config) => this.config = { ...data }, // success path
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
      .subscribe((data: ConfigInterface) => this.config = { ...data });  // /http#requesting-data-from-a-server
                                                                // /http#requesting-a-typed-response
  }

}
