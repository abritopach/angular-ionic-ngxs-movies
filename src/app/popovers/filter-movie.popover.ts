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

  filter$: Observable<any>;
  filterSubscription: any;

  constructor(private popoverCtrl: PopoverController, private store: Store, private zone: NgZone) {
  }

  ngOnInit() {
    this.filter$ = this.store.select(state => state.catalog.filter);
    this.filterSubscription = this.filter$.subscribe((filter => {
      // console.log('filter', filter);
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

  updateRange(e) {
    console.log('updateRange', e, this.filters.years);
    /// Refresh the UI
    this.zone.run(() => {
          console.log('UI has refreshed');
    });
  }

}
