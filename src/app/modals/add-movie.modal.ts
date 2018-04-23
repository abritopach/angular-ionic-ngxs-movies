import { Component, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Store } from '@ngxs/store';
import { AddMovie } from '../store/actions/movies.actions';
@Component({
  selector: 'app-add-movie',
  templateUrl: 'add-movie.modal.html',
  styleUrls: ['./add-movie.modal.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddMovieModalComponent {

  movie: any = {
    title: '',
    year: '',
    director: '',
    cast: '',
    genre: '',
    notes: '',
    poster: ''
  };

  constructor(private modalCtrl: ModalController, private store: Store) { }

  dismiss(data?: any) {
    // Using the injected ModalController this page
    // can "dismiss" itself and pass back data.
    this.modalCtrl.dismiss(data);
  }

  movieForm() {
    console.log(this.movie);
    this.store.dispatch(new AddMovie(this.movie));
  }

}
