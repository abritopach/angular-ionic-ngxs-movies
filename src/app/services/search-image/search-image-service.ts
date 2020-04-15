import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout, retryWhen, delay, map, filter } from 'rxjs/operators';

@Injectable()
export class SearchImageService {

  private readonly URL_BASE: string = 'https://www.googleapis.com/customsearch/v1';
  private readonly API_KEY: string = 'AIzaSyCPqf8puyl9DyVFPy_KTAARdaBPRpfYHoA';
  private readonly CUSTOM_SEARCH_ENGINE_ID: string = '012020920993535583437:nqayyeenfrw';

  constructor(private http: HttpClient) {
  }

  searchImage(searchQuery: string): Observable<any> {
    return this.http
    // https://www.googleapis.com/customsearch/v1?q=Mia%20Wasikowska&cx=012020920993535583437:nqayyeenfrw
    // &key=AIzaSyCPqf8puyl9DyVFPy_KTAARdaBPRpfYHoA&searchType=image&alt=json
    .get(encodeURI(this.URL_BASE + `?q=${searchQuery}&cx=${this.CUSTOM_SEARCH_ENGINE_ID}&key=${this.API_KEY}&searchType=image&alt=json`))
    .pipe(
      retryWhen(error => error.pipe(delay(500))),
      timeout(5000)
    );
  }


}
