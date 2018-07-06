import { Component, ViewEncapsulation, OnInit, OnDestroy, NgZone } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { Store } from '@ngxs/store';
import { FilterMovies, FetchMovies, SaveFilterMovies } from '../store/actions/movies.actions';

import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-filter-movie-popover',
  templateUrl: 'filter-movie.popover.html',
  styleUrls: ['./filter-movie.popover.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterMoviePopoverComponent implements OnInit, OnDestroy {

  range: any = {
    lower: 1900,
    upper: new Date().getFullYear()
  };

  filters: any = {
    years: {
      lower: 1900,
      upper: new Date().getFullYear()
    },
    genre: 'Action'
  };

  filter$: Observable<any>;
  filterSubscription: any;

  customPopoverOptions: any = {
    header: 'Genre',
    subHeader: 'Select movie genre',
  };

  genres = [
    {id: 1, name: 'Action', image: 'assets/movies-genres/action.png'},
    {id: 2, name: 'Comedy', image: 'assets/movies-genres/comedy.png'},
    {id: 3, name: 'Crime', image: 'assets/movies-genres/crime.png'},
    {id: 4, name: 'Documentary', image: 'assets/movies-genres/documentary.png'},
    {id: 5, name: 'Drama', image: 'assets/movies-genres/drama.png'},
    {id: 6, name: 'Fantasy', image: 'assets/movies-genres/fantasy.png'},
    {id: 7, name: 'Film noir', image: 'assets/movies-genres/film noir.png'},
    {id: 8, name: 'Horror', image: 'assets/movies-genres/horror.png'},
    {id: 9, name: 'Romance', image: 'assets/movies-genres/romance.png'},
    {id: 10, name: 'Science fiction', image: 'assets/movies-genres/science fiction.png'},
    {id: 11, name: 'Westerns', image: 'assets/movies-genres/westerns.png'}
];

  constructor(private popoverCtrl: PopoverController, private store: Store, private zone: NgZone) {
  }

  ngOnInit() {
    this.filter$ = this.store.select(state => state.catalog.filter);
    this.filterSubscription = this.filter$.subscribe((filter => {
      this.filters = {...filter};
    }));
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }

  filterMovies() {
    this.store.dispatch([
      new FilterMovies(this.filters),
      new SaveFilterMovies(this.filters)
    ]);
    this.popoverCtrl.dismiss();
  }

  clearFilterMovies() {
    this.filters = {};
    this.store.dispatch([
      new FilterMovies(this.filters),
      new SaveFilterMovies(this.filters)
    ]);
    this.popoverCtrl.dismiss();
  }

}
