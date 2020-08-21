/**
 *   https://angular.io/guide/http#optimizing-server-interaction-with-debouncing
  *   app/package-search/package-search.component.html (search)
  *   app/package-search/package-search.component.ts (excerpt)
 *    https://angular.io/guide/http#using-the-switchmap-operator
*/
import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { NpmPackageInfo, PackageSearchService } from './package-search.service';

@Component({
  selector: 'app-package-search',
  templateUrl: './package-search.component.html',
  providers: [ PackageSearchService ]
})
export class PackageSearchComponent implements OnInit {
  withRefresh = false; // https://angular.io/guide/http#optimizing-server-interaction-with-debouncing
  packages$: Observable<NpmPackageInfo[]>;  //  https://angular.io/guide/http#optimizing-server-interaction-with-debouncing
  private searchText$ = new Subject<string>();

  search(packageName: string) { //    https://angular.io/guide/http#optimizing-server-interaction-with-debouncing
    this.searchText$.next(packageName);
  }

  ngOnInit() {  //  https://angular.io/guide/http#optimizing-server-interaction-with-debouncing
    this.packages$ = this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(packageName =>
        this.searchService.search(packageName, this.withRefresh))
    );
  }

  constructor(private searchService: PackageSearchService) { }  //  https://angular.io/guide/http#optimizing-server-interaction-with-debouncing


  toggleRefresh() { this.withRefresh = ! this.withRefresh; }

}
