import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { Store, Actions, ofActionCompleted } from '@ngxs/store';
import { UpdateFormValue, UpdateFormStatus } from '@ngxs/form-plugin';
import { AddMovie, EditMovie } from '../store/actions/movies.actions';
import { Movie } from '../models/movie.model';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {default as iziToast, IziToastSettings} from 'izitoast';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-modal',
  templateUrl: 'movie.modal.html',
  styleUrls: ['./movie.modal.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MovieModalComponent implements OnInit {

  movie: Movie = {
    id: '',
    title: '',
    year: new Date().getFullYear(),
    director: '',
    cast: '',
    genre: '',
    notes: '',
    poster: ''
  };
  emptyMovie: any;

  modal: any = {
    title: '',
    buttonText: ''
  };

  movieForm: FormGroup;

  // Reads the name of the store from the store class.
  movieForm$: Observable<Movie[]>;

  constructor(private formBuilder: FormBuilder, private modalCtrl: ModalController, private navParams: NavParams, private store: Store,
              private actions$: Actions) {
    this.emptyMovie = this.movie;
    this.createForm();
  }

  createForm() {
    this.movieForm = this.formBuilder.group({
      id: '',
      index: 0,
      title: ['', Validators.required],
      year: [new Date().getFullYear(), Validators.required],
      director: [''],
      cast: [''],
      genre: [''],
      notes: [''],
      poster: ['']
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

    this.actions$.pipe(ofActionCompleted(AddMovie)).subscribe(() => {
      this.dismiss();
      const {title, message, position} = {title: 'Add movie', message: 'Movie added successfully.', position: 'bottomLeft'};
      iziToast.success({title, message, position} as IziToastSettings);
    });
    this.actions$.pipe(ofActionCompleted(EditMovie)).subscribe(() => {
      this.dismiss();
      const {title, message, position} = {title: 'Edit movie', message: 'Movie updated successfully.', position: 'bottomLeft'};
      iziToast.success({title, message, position} as IziToastSettings);
    });
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
    if (this.navParams.data.option === 'add') {
      this.store.dispatch([
        new AddMovie(this.movie)/*,
        new UpdateFormValue({
          value: this.movie,
          path: 'catalog.movieForm'
        }),
        new UpdateFormStatus({
          status: 'DONE',
          path: 'catalog.movieForm'
        })
        */
      ]);

    } else if (this.navParams.data.option === 'edit') {
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

}
