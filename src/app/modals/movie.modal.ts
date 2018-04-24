import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { Store, Actions, ofActionCompleted } from '@ngxs/store';
import { AddMovie, EditMovie } from '../store/actions/movies.actions';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie-modal',
  templateUrl: 'movie.modal.html',
  styleUrls: ['./movie.modal.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MovieModalComponent implements OnInit {

  movie: Movie = {
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

  constructor(private modalCtrl: ModalController, private navParams: NavParams, private store: Store, private actions$: Actions) { }

  ngOnInit() {
    this.actions$.pipe(ofActionCompleted(AddMovie)).subscribe(() => this.dismiss());
    this.actions$.pipe(ofActionCompleted(EditMovie)).subscribe(() => this.dismiss());
  }

  ionViewDidEnter() {
    this.modal = { ...this.navParams.data.modalProps};
    if (this.navParams.data.option === 'edit') {
      this.movie = { ...this.navParams.data.modalProps.movie };
    }
  }

  dismiss(data?: any) {
    // Using the injected ModalController this page
    // can "dismiss" itself and pass back data.
    this.modalCtrl.dismiss(data);
  }

  movieForm() {
    console.log(this.movie);

    if (this.navParams.data.option === 'add') {
      this.store.dispatch(new AddMovie(this.movie));
    } else if (this.navParams.data.option === 'edit') {
      this.store.dispatch(new EditMovie(this.movie));
    }
  }

}
