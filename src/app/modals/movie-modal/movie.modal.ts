import { Component, ViewEncapsulation, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { Store, Actions } from '@ngxs/store';
import { UpdateFormValue, UpdateFormStatus } from '@ngxs/form-plugin';
import { AddMovie, EditMovie } from '../../store/actions/movies.actions';
import { Movie } from '../../models/movie.model';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {default as iziToast, IziToastSettings} from 'izitoast';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-modal',
  templateUrl: 'movie.modal.html',
  styleUrls: ['./movie.modal.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MovieModalComponent implements OnInit, AfterViewInit {

  movie: Movie = {
    id: '',
    title: '',
    year: new Date().getFullYear(),
    director: '',
    cast: '',
    genre: '',
    notes: '',
    poster: '',
    videoId: '',
    genreImage: ''
  };
  emptyMovie: any;

  modal: any = {
    title: '',
    buttonText: ''
  };

  movieForm: FormGroup;

  // Reads the name of the store from the store class.
  movieForm$: Observable<Movie[]>;

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

  constructor(private formBuilder: FormBuilder, private modalCtrl: ModalController, public navParams: NavParams, private store: Store,
              private actions$: Actions, private renderer: Renderer2) {
    this.emptyMovie = this.movie;
    this.createForm();
  }

  createForm() {
    this.movieForm = this.formBuilder.group({
      id: '',
      index: 0,
      title: new FormControl('', Validators.required),
      year: new FormControl(new Date().getFullYear(), Validators.required),
      director: new FormControl(''),
      cast: new FormControl(''),
      genre: new FormControl('Action'),
      notes: new FormControl(''),
      poster: new FormControl('')
    });

    this.movieForm$ = this.store.select(state => state.catalog.movieForm);
    this.movieForm$.subscribe((data => {
      if ((data['model'] !== null) && (data['status'] === 'PENDING')) {
        // Check if the user has added information about a movie but has not inserted it.
        this.movieForm.patchValue(data['model']);
      }
    }));
  }

  ngOnInit() {
    this.modal = { ...this.navParams.data.modalProps};
    if (this.navParams.data.option === 'edit') {
      // this.movie = { ...this.navParams.data.modalProps.movie };
      this.movieForm.patchValue(this.navParams.data.modalProps.movie);
    }
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit movie.modal');
    const element = this.renderer.selectRootElement('#myInput');
    console.log('element', element);
    setTimeout(() => element.focus(), 3000);
  }

  dismiss(data?: any) {
    // Using the injected ModalController this page
    // can "dismiss" itself and pass back data.
    // console.log('dismiss', data);
    if (this.navParams.data.option === 'add') {
      this.store.dispatch([
        new UpdateFormValue({
          value: data,
          path: 'catalog.movieForm'
        }),
        new UpdateFormStatus({
          status: 'PENDING',
          path: 'catalog.movieForm'
        })
      ]);
    }
    this.modalCtrl.dismiss(data);
  }

  movieFormSubmit() {
    this.movie = this.movieForm.value;
    this.movie.genre = this.movie.genre.toString();
    if (this.navParams.data.option === 'add') {
      console.log('movieFormSubmit add');
      this.store.dispatch(
        new AddMovie(this.movie)
      ).subscribe(() => this.clearMovieForm()
      );

    } else if (this.navParams.data.option === 'edit') {
      console.log('movieFormSubmit edit');
      this.store.dispatch(new EditMovie(this.movie));
    }
  }

  clearMovieForm() {
    console.log('clearMovieForm');
    this.movieForm.reset();
    this.store.dispatch([
      new UpdateFormValue({
        value: this.emptyMovie,
        path: 'catalog.movieForm'
      }),
      new UpdateFormStatus({
        status: '',
        path: 'catalog.movieForm'
      })
    ]);
  }

  takePicture() {
    console.log('takePicture');
  }

}
