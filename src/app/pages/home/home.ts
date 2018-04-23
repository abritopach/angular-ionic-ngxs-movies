import { Component, ViewEncapsulation } from '@angular/core';

import { MoviesService } from '../../providers/movies-service';

import { Movie } from '../../models/movie.model';
import { MoviesStateModel } from '../../store/state/movies.state';

// import { InfiniteScroll } from '@ionic/core';

import { InfiniteScroll } from '@ionic/angular';

import { Store, Select } from '@ngxs/store';

import { FetchMovies } from '../../store/actions/movies.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {

  // Reads the name of the store from the store class.
  // @Select(MoviesStateModel) movies$: Observable<Movie[]>;
  movies$: Observable<Movie[]>;
  start: number;
  end: number;

  constructor(private moviesService: MoviesService, private store: Store) {
    this.start = 0;
    this.end = 20;
    this.movies$ = this.store.select(state => state.catalog.movies);
    this.fetchMovies(this.start, this.end);
  }

  fetchMovies(name, url) {
    this.store.dispatch(new FetchMovies({start: this.start, end: this.end}));
  }

  doInfinite(infiniteScroll: InfiniteScroll) {
    console.log('Begin async operation');
    console.log(infiniteScroll);
    this.start = this.end;
    this.end += 20;
    this.fetchMovies(this.start, this.end);
    /*
    this.moviesService.getMovies(this.start, this.end)
    .subscribe(
        data => {
            console.log(data);
            setTimeout(() => {
              console.log('Async operation has ended');
              this.movies = [...this.movies, ...data];
              if (infiniteScroll) {
                infiniteScroll.complete();
              }
            }, 500);
        },
        error => {
            console.log(<any>error);
            infiniteScroll.complete();
      }
    );
    */
  }

}
