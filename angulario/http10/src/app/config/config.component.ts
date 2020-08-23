import { ConfigClass } from './config-class';
import { Component, OnInit } from '@angular/core';
import {  ConfigService } from './config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  configService: any;
  config: { heroesUrl: any; textfile: any; };

  constructor() { }

  ngOnInit(): void {
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe((data: ConfigClass) => this.config = {
          heroesUrl: data.heroesUrl,
          textfile:  data.textfile
      });
  }
}
