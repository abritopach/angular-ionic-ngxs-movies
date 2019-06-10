import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from '../../models/movie.model';

import { ModalController, PopoverController, IonInfiniteScroll, IonContent } from '@ionic/angular';

import { Store, Select, Actions, ofActionSuccessful } from '@ngxs/store';

import { FetchMovies, DeleteMovie, AddMovie, EditMovie, /*SearchMovies,*/
         ClearMovies } from '../../store/actions/movies.actions';
import { Observable } from 'rxjs';

import { MovieModalComponent } from '../../modals/movie-modal/movie.modal';
import { FilterMoviePopoverComponent } from '../../popovers/filter-movie.popover';
import { FavoritesMoviesModalComponent } from '../../modals/favorites-movies-modal/favorites.movies.modal';

import { withLatestFrom } from 'rxjs/operators';

import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { IziToastService } from '../../providers/izi-toast.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  currentYear = new Date().getFullYear();
  // Reads the name of the store from the store class.
  @Select(state => state.catalog.movies) movies$: Observable<Movie[]>;
  // movies$: Observable<Movie[]>;
  start: number;
  end: number;
  showScrollTop: Boolean = false;
  @ViewChild('infiniteScroll', { read: ElementRef, static: true }) infiniteScroll: IonInfiniteScroll;
  showSkeleton: Boolean = true;
  // movies: Movie[];
  @ViewChild(IonContent, { read: ElementRef, static: true }) content: IonContent;
  searchControl: FormControl;
  iconView = 'apps';

  constructor(private store: Store, private router: Router, private modalCtrl: ModalController,
              private actions$: Actions, private popoverCtrl: PopoverController,
              private iziToast: IziToastService) {
    console.log('constructor home');
    this.start = 0;
    this.end = 20;
    this.searchControl = new FormControl();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');

    /*
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      // console.log('this.searchControl.valueChanges', search);
      if (search === '') {
        this.start = 0;
        this.end = 20;
        this.store.dispatch([
          new ClearMovies(),
          new FetchMovies({start: this.start, end: this.end})
        ]);
      } else {
        this.store.dispatch(new SearchMovies({queryText: search}));
      }
    });
    */

  }

  ngOnInit() {
    console.log('ngOnInit home');
    this.fetchMovies(this.start, this.end);
     // Check if we have movies in local storage.
     if (localStorage.getItem('@@STATE') !== 'undefined') {
      const state = JSON.parse(localStorage.getItem('@@STATE'));
      console.log('state', state);
      // const { movies } = state.catalog;
      // console.log('movies', movies);
    }

    this.actions$.pipe(ofActionSuccessful(AddMovie)).subscribe(() => {
      this.modalCtrl.dismiss();
      this.iziToast.success('Add movie', 'Movie added successfully.');
    },
    err => console.log('HomePage::ngOnInit ofActionSuccessful(AddMovie) | method called -> received error' + err));

    this.actions$.pipe(ofActionSuccessful(EditMovie)).subscribe(() => {
      this.modalCtrl.dismiss();
      this.iziToast.success('Edit movie', 'Movie updated successfully.');
    },
    err => console.log('HomePage::ngOnInit ofActionSuccessful(EditMovie) | method called -> received error' + err));

    this.actions$.pipe(ofActionSuccessful(DeleteMovie)).subscribe(() => {
      this.iziToast.success('Delete movie', 'Movie deleted successfully.');
    },
    err => console.log('HomePage::ngOnInit ofActionSuccessful(DeleteMovie) | method called -> received error' + err));
  }

  fetchMovies(start, end) {
    console.log('HomePage::fetchMovies | method called', start, end);
    // this.presentLoading();
    this.store.dispatch(new FetchMovies({start: start, end: end})).pipe(withLatestFrom(this.movies$))
      .subscribe(([movies]) => {
        console.log('movies', movies);
        setTimeout( () => {
          // this.dismissLoading();
          this.showSkeleton = false;
        }, 2000);
      },
      err => console.log('HomePage::fetchMovies() | method called -> received error' + err)
    );
  }

  viewMovieDetails(movie: Movie) {
    // console.log('viewMovieDetails', movie);
    const movieDetailsURL = `/detail/${movie.id}`;
    this.router.navigate([movieDetailsURL]);
  }

  async presentModal(componentProps: any, component) {
    const modal = await this.modalCtrl.create({
      component: component,
      componentProps: componentProps
    });
    await modal.present();

    const {data} = await modal.onWillDismiss();
    if (data) {
      console.log('data', data);
    }
  }

  addMovie() {
    // console.log('addMovie');
    const componentProps = { modalProps: { title: 'Add Movie', buttonText: 'Add Movie'}, option: 'add'};
    this.presentModal(componentProps, MovieModalComponent);
  }

  editMovie(movie: Movie) {
    // console.log('editMovie', movie);
    const componentProps = { modalProps: { title: 'Edit Movie', buttonText: 'Edit Movie', movie: movie}, option: 'edit'};
    this.presentModal(componentProps, MovieModalComponent);
  }

  deleteMovie(movie: Movie) {
    // console.log('deleteMovie', movie);
    this.store.dispatch(new DeleteMovie(movie));
  }

  doInfinite(event) {
    console.log('doInfinite', event);
    event.target.complete();
    this.showSkeleton = true;
    this.start = this.end;
    this.end += 20;
    this.showScrollTop = true;
    this.fetchMovies(this.start, this.end);
  }

  async presentPopover(event) {
    // console.log('presentPopover');
    const popover = await this.popoverCtrl.create({
      component: FilterMoviePopoverComponent,
      event: event
    });

    await popover.present();

    const { data } = await popover.onWillDismiss();

    if (data) {
      console.log('data popover.onWillDismiss', data);
    }

  }

  scrollToTop() {
    // console.log('scrollToTop', this.content);
    this.content['nativeElement'].scrollToTop();
  }

  changeView() {
    console.log('HomePage::changeView() | method called');
    this.iconView =  this.iconView === 'apps' ? 'list' : 'apps';
  }

  showFavoritesMovies() {
    console.log('HomePage::showFavoritesMovies() | method called');
    const state = JSON.parse(localStorage.getItem('@@STATE'));
    const componentProps = { modalProps: { title: 'Favorites Movies', favoritesMovies: state.catalog.favorites}};
    this.presentModal(componentProps, FavoritesMoviesModalComponent);
  }

}
