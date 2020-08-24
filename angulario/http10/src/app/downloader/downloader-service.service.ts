import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class DownloaderServiceService {

  http: any;

  constructor() { }

  getTextFile(filename: string) {
    // The Observable returned by get() is of type Observable<string>
    // because a text response was specified.
    // There's no need to pass a <string> type parameter to get().
    return this.http.get(filename, {responseType: 'text'})
      .pipe(
        tap( // Log the result or error
          data => this.log(filename, data),
          error => this.logError(filename, error)
        )
      );
  }
  log(filename: string, data: unknown): void {
    throw new Error('Method not implemented.');
  }
  logError(filename: string, error: any): void {
    throw new Error('Method not implemented.');
  }
}
