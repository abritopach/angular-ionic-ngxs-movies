import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout, retryWhen, delay, map } from 'rxjs/operators';

import { Movie } from '../models/movie.model';

@Injectable()
export class MoviesService {

  constructor(private http: HttpClient) {
  }

  getMovies(): Observable<any> {
    return this.http
    .get(`http://localhost:3000/movies?_limit=20`)
    .pipe(
      retryWhen(error => error.pipe(delay(500))),
      timeout(5000)
    );
  }
}
