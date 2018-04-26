import { Component, ViewEncapsulation } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { Store } from '@ngxs/store';
import { FilterMovies } from '../store/actions/movies.actions';

@Component({
  selector: 'app-filter-movie-popover',
  templateUrl: 'filter-movie.popover.html',
  styleUrls: ['./filter-movie.popover.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterMoviePopoverComponent {

  range: any = {
    min: '1900',
    max: new Date().getFullYear().toString()
  };

  filters: any = {
    years: {
      lower: '1900',
      upper: new Date().getFullYear().toString()
    },
    genre: ''
  };

  constructor(private popoverCtrl: PopoverController, private store: Store) {
  }

  filterMovies() {
    console.log('filterMovies');
    console.log('filters', this.filters);
    this.store.dispatch(new FilterMovies(this.filters));
    this.popoverCtrl.dismiss();
  }


}
