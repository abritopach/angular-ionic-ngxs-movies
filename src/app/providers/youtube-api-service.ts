import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout, retryWhen, delay, map, filter } from 'rxjs/operators';

@Injectable()
export class YoutubeApiService {

  private readonly URL_BASE: string = 'https://www.googleapis.com/youtube/v3/search';
  private readonly API_KEY: string = 'AIzaSyDxuxEANLFVy5q4sG1NrAUJNhoX6nW4VQ4';

  constructor(private http: HttpClient) {
  }

  searchMovieTrailer(movieTitle: string): Observable<any> {
    console.log(this.URL_BASE + `?key=${this.API_KEY}&q=${movieTitle}&type=video&part=snippet,id&maxResults=5`);
    return this.http
    .get(encodeURI(this.URL_BASE + `?key=${this.API_KEY}&q=${movieTitle}&type=video&part=snippet,id&maxResults=5`))
    .pipe(
      retryWhen(error => error.pipe(delay(500))),
      timeout(5000)
    );
  }


}
