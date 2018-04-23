import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout, retryWhen, delay, map } from 'rxjs/operators';

import { Movie } from '../models/movie.model';

@Injectable()
export class MoviesService {

  private readonly URL_BASE: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
  }

  getMovies(start: number, end: number): Observable<Movie[]> {
    return this.http
    // Type-checking the response => .get<Movie[]>
    .get<Movie[]>(this.URL_BASE + `movies?_start=${start}&_end=${end}`)
    .pipe(
      retryWhen(error => error.pipe(delay(500))),
      timeout(5000)
    );
  }

  getMovie(title: string): Observable<Movie> {
    // console.log(encodeURI(this.URL_BASE + `movies?title=${title}`));
    return this.http
    // Type-checking the response => .get<Movie>
    .get<Movie>(encodeURI(this.URL_BASE + `movies?title=${title}`))
    .pipe(
      retryWhen(error => error.pipe(delay(500))),
      timeout(5000)
    );
  }
}
