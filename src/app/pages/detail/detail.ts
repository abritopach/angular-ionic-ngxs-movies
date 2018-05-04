import { Component, ViewEncapsulation } from '@angular/core';

import { Movie } from '../../models/movie.model';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-detail',
  templateUrl: './detail.html',
  styleUrls: ['./detail.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailComponent {

  selectedMovie: Observable<Movie>;
  movie: Movie;

  constructor(private store: Store) {

  }

  ionViewWillEnter() {
    // console.log('ionViewWillEnter');

    this.selectedMovie = this.store.select(state => state.catalog.selectedMovie);

    this.selectedMovie.subscribe(
      data => {
          // console.log(data);
          this.movie = data;
      },
      error => {
          console.log(<any>error);
      }
    );
  }

  watchTrailer() {
    console.log('watchTrailer');
  }

}
