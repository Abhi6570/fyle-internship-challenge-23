import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private apiUrl = 'https://api.github.com';
  private cache = new Map<string, any>(); // cache API responses

  constructor(private http: HttpClient) { }

  getUserRepos(username: string, page = 1, perPage = 10) {
    const cacheKey = `${username}_${page}_${perPage}`;
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    return this.http.get(`${this.apiUrl}/users/${username}/repos`, {
      params: {
        page,
        per_page: perPage
      }
    })
      .pipe(
        tap((response) => {
          this.cache.set(cacheKey, response);
        }),
        catchError((error) => {
          console.error(error);
          return of([]);
        })
      );
  }
}
