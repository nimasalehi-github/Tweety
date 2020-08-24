import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-downloader',
  templateUrl: './downloader.component.html',
  styleUrls: ['./downloader.component.css']
})
export class DownloaderComponent implements OnInit {
  downloaderService: any;
  contents: any;

  constructor() { }
  download() {
    this.downloaderService.getTextFile('assets/textfile.txt')
      .subscribe((results: any) => this.contents = results);
  }
  ngOnInit(): void {
  }

}
