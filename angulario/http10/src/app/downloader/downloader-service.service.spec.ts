import { TestBed } from '@angular/core/testing';

import { DownloaderServiceService } from './downloader-service.service';

describe('DownloaderServiceService', () => {
  let service: DownloaderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloaderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
