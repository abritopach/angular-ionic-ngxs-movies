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
    genre: ''
  };

  filter$: Observable<any>;
  filterSubscription: any;

  customPopoverOptions: any = {
    header: 'Genre',
    subHeader: 'Select movie genre',
  };

  cities3 = [
    {id: 1, name: 'Vilnius', avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'},
    {id: 2, name: 'Kaunas', avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15'},
    {id: 3, name: 'Pavilnys', avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15'},
    {id: 4, name: 'Vilnius', avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'},
    {id: 5, name: 'Kaunas', avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15'},
    {id: 6, name: 'Pavilnys', avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15'},
    {id: 7, name: 'Vilnius', avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'},
    {id: 8, name: 'Kaunas', avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15'},
    {id: 9, name: 'Pavilnys', avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15'},
    {id: 10, name: 'Vilnius', avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'},
    {id: 11, name: 'Kaunas', avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15'},
    {id: 12, name: 'Pavilnys', avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15'}
];

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

}
