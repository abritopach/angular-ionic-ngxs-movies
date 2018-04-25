import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { Store, Actions, ofActionCompleted } from '@ngxs/store';
import { AddMovie, EditMovie } from '../store/actions/movies.actions';
import { Movie } from '../models/movie.model';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {default as iziToast, IziToastSettings} from 'izitoast';

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

  modal: any = {
    title: '',
    buttonText: ''
  };

  movieForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private modalCtrl: ModalController, private navParams: NavParams, private store: Store,
              private actions$: Actions) {
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
    this.modalCtrl.dismiss(data);
  }

  movieFormSubmit() {
    this.movie = this.movieForm.value;
    if (this.navParams.data.option === 'add') {
      this.store.dispatch(new AddMovie(this.movie));
    } else if (this.navParams.data.option === 'edit') {
      this.store.dispatch(new EditMovie(this.movie));
    }
  }

}
