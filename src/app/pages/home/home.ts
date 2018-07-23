import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { MoviesService } from '../../providers/movies-service';

import { Movie } from '../../models/movie.model';
import { MoviesStateModel } from '../../store/state/movies.state';

import { InfiniteScroll, ModalController, PopoverController, LoadingController } from '@ionic/angular';

import { Store, Select, Actions, ofActionSuccessful } from '@ngxs/store';
import { UpdateFormValue, UpdateFormStatus } from '@ngxs/form-plugin';

import { FetchMovies, SelectedMovie, DeleteMovie, AddMovie, EditMovie, SearchMovies,
         ClearMovies } from '../../store/actions/movies.actions';
import { Observable } from 'rxjs';

import { MovieModalComponent } from '../../modals/movie-modal/movie.modal';
import { FilterMoviePopoverComponent } from '../../popovers/filter-movie.popover';
import { FavoritesMoviesModalComponent } from '../../modals/favorites-movies-modal/favorites.movies.modal';

import {default as iziToast, IziToastSettings} from 'izitoast';

import { Content } from '@ionic/angular';

import { withLatestFrom } from 'rxjs/operators';

import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

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
  // infiniteScroll: any;
  @ViewChild('infiniteScroll') infiniteScroll: ElementRef;
  showSkeleton: Boolean = true;
  // movies: Movie[];
  @ViewChild(Content) content: Content;
  defaultIziToastSettings: IziToastSettings = {
    color: 'green',
    title: '',
    icon: 'ico-success',
    message: '',
    position: 'bottomLeft',
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
    image: 'assets/avatar.png',
    imageWidth: 70,
    layout: 2,
  };
  searchControl: FormControl;
  searching: Boolean = false;
  iconView: String = 'apps';

  constructor(private moviesService: MoviesService, private store: Store, private router: Router, private modalCtrl: ModalController,
              private actions$: Actions, private popoverCtrl: PopoverController, private loadingCtrl: LoadingController) {
    console.log('constructor home');
    this.start = 0;
    this.end = 20;
    this.searchControl = new FormControl();
    // this.movies$ = this.store.select(state => state.catalog.movies);
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.fetchMovies(this.start, this.end);
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      // console.log('this.searchControl.valueChanges', search);
      this.searching = false;

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

  }

  ngOnInit() {

    console.log('ngOnInit home');
     // Check if we have movies in local storage.
     if (localStorage.getItem('@@STATE') !== 'undefined') {
      const state = JSON.parse(localStorage.getItem('@@STATE'));
      console.log('state', state);
      // const { movies } = state.catalog;
      // console.log('movies', movies);
    }

    this.actions$.pipe(ofActionSuccessful(AddMovie)).subscribe(() => {
      const newSettings: IziToastSettings = {title: 'Add movie', message: 'Movie added successfully.', position: 'bottomLeft'};
      this.modalCtrl.dismiss();
      iziToast.show({...this.defaultIziToastSettings, ...newSettings});
    },
    err => console.log('HomePage::ngOnInit ofActionSuccessful(AddMovie) | method called -> received error' + err));

    this.actions$.pipe(ofActionSuccessful(EditMovie)).subscribe(() => {
      this.modalCtrl.dismiss();
      const newSettings: IziToastSettings = {title: 'Edit movie', message: 'Movie updated successfully.', position: 'bottomLeft'};
      iziToast.success({...this.defaultIziToastSettings, ...newSettings});
    },
    err => console.log('HomePage::ngOnInit ofActionSuccessful(EditMovie) | method called -> received error' + err));

    this.actions$.pipe(ofActionSuccessful(DeleteMovie)).subscribe(() => {
      const newSettings: IziToastSettings = {title: 'Delete movie', message: 'Movie deleted successfully.', position: 'bottomLeft'};
      iziToast.success({...this.defaultIziToastSettings, ...newSettings});
    },
    err => console.log('HomePage::ngOnInit ofActionSuccessful(DeleteMovie) | method called -> received error' + err));

    // this.infiniteScroll = document.getElementById('infinite-scroll');
  }

  searchMovies(ev: any) {
    console.log('HomePage::searchMovies() | method called', ev.target.value);
    this.searching = true;
  }

  cancelSearch(ev: any) {
    console.log('HomePage::cancelSearch | method called');
  }

  fetchMovies(start, end) {
    // this.presentLoading();
    // this.store.dispatch(new FetchMovies({start: this.start, end: this.end})).subscribe((result) => {
      // console.log(result);
      // this.movies = result.catalog.movies;
      /*
      setTimeout( () => {
        this.showSkeleton = false;
      }, 2000);
      */
    // if (this.infiniteScroll) {
    //   this.infiniteScroll.nativeElement.complete();
    //  }
    // });

    this.store.dispatch(new FetchMovies({start: start, end: end})).pipe(withLatestFrom(this.movies$))
      .subscribe(([movies]) => {
        console.log(movies);
        setTimeout( () => {
          this.showSkeleton = false;
        }, 2000);
        if (this.infiniteScroll) {
          this.infiniteScroll.nativeElement.complete();
        }
      },
      err => console.log('HomePage::fetchMovies() | method called -> received error' + err)
    );
  }

  viewMovieDetails(movie: Movie) {
    // console.log('viewMovieDetails', movie);
    this.store.dispatch(new SelectedMovie({title: movie.title}));
    this.router.navigateByUrl(`/detail`);
  }

  async presentModal(componentProps: any) {
    const modal = await this.modalCtrl.create({
      component: MovieModalComponent,
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
    this.presentModal(componentProps);
  }

  editMovie(movie: Movie, index: number) {
    // console.log('editMovie', movie, 'index', index);
    movie['index'] = index;
    const componentProps = { modalProps: { title: 'Edit Movie', buttonText: 'Edit Movie', movie: movie}, option: 'edit'};
    this.presentModal(componentProps);
  }

  deleteMovie(movie: Movie) {
    // console.log('deleteMovie', movie);
    this.store.dispatch(new DeleteMovie(movie));
  }

  doInfinite() {
    // console.log('Begin async operation');
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
      ev: event
    });

    await popover.present();

    const { data } = await popover.onWillDismiss();

    if (data) {
      console.log('data popover.onWillDismiss', data);
    }

  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      content: 'Please wait, loading movies...',
    });
    await loading.present();

    const { data } = await loading.onWillDismiss();
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  changeView() {
    console.log('HomePage::changeView() | method called');
    this.iconView =  this.iconView === 'apps' ? 'list' : 'apps';
  }

  showFavoritesMovies() {
    console.log('HomePage::showFavoritesMovies() | method called');
    const state = JSON.parse(localStorage.getItem('@@STATE'));
    const componentProps = { modalProps: { title: 'Favorites Movies', favoritesMovies: state.catalog.favorites}};
    this.presentFavoritesModal(componentProps);
  }

  async presentFavoritesModal(componentProps: any) {
    const modal = await this.modalCtrl.create({
      component: FavoritesMoviesModalComponent,
      componentProps: componentProps
    });
    await modal.present();

    const {data} = await modal.onWillDismiss();
    if (data) {
      console.log('data', data);
    }
  }

}
