/** https://angular.io/guide/http#sending-data-to-a-server
 *    https://angular.io/guide/http#making-a-post-request
 *      app/heroes/heroes.service.ts (addHero)
 *      app/heroes/heroes.component.ts (addHero)
 *    https://angular.io/guide/http#making-a-delete-request
 *      app/heroes/heroes.service.ts (deleteHero)
 *      app/heroes/heroes.component.ts (deleteHero)
 *    https://angular.io/guide/http#making-a-put-request
 *      app/heroes/heroes.service.ts (updateHero)
 *    https://angular.io/guide/http#adding-and-updating-headers
 *      https://angular.io/guide/http#adding-headers
 *        app/heroes/heroes.service.ts (httpOptions)
 *      https://angular.io/guide/http#updating-headers
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

/** Important options include the observe and responseType properties.
The observe option specifies how much of the response to return.
The responseType option specifies the format in which to return data. */

import { HttpHeaders } from '@angular/common/http'; // http#adding-headers


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Hero } from './hero';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = { // /http#adding-headers
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class HeroesService {
  heroesUrl = 'api/heroes';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }

  /** GET heroes from the server */
  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Hero[]>(this.heroesUrl, options)
      .pipe(
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the database */
  addHero (hero: Hero): Observable<Hero> { // /http#making-a-post-request
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        catchError(this.handleError('addHero', hero))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteHero (id: number): Observable<{}> { // /http#making-a-delete-request
    const url = `${this.heroesUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteHero'))
      );
  }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updateHero (hero: Hero): Observable<Hero> { // /http#making-a-put-request
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        catchError(this.handleError('updateHero', hero))
      );
  }
}
