import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';

import { Store } from '@ngxs/store';
import { Movie } from '../../models/movie.model';

import { SelectedMovie, DeleteFavoriteMovie, DeleteAllFavoritesMovies } from '../../store/actions/movies.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites-movies-modal',
  templateUrl: 'favorites.movies.modal.html',
  styleUrls: ['./favorites.movies.modal.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FavoritesMoviesModalComponent implements OnInit {

  modal: any = {
    title: ''
  };

  constructor(private modalCtrl: ModalController, private navParams: NavParams, private store: Store, private router: Router,
              private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.modal = { ...this.navParams.data.modalProps};
    console.log(this.modal);
  }

  dismiss() {
    // Using the injected ModalController this page
    // can "dismiss" itself and pass back data.
    // console.log('dismiss', data);
    this.modalCtrl.dismiss();
  }

  viewMovieDetails(movie: Movie) {
    // console.log('viewMovieDetails', movie);
    this.store.dispatch(new SelectedMovie({title: movie.title}));
    this.router.navigateByUrl(`/detail`);
    this.modalCtrl.dismiss();
  }

  deleteFavoriteMovie(movie: Movie) {
    console.log('FavoritesMoviesModalComponent::deleteFavoriteMovie() | method called');
    this.store.dispatch(new DeleteFavoriteMovie(movie));
    this.modal.favoritesMovies = this.modal.favoritesMovies.filter(m => m.title !== movie.title);
  }

  deleteAll() {
    console.log('FavoritesMoviesModalComponent::deleteAll() | method called');
    this.modal.favoritesMovies = [];
    const state = JSON.parse(localStorage.getItem('@@STATE'));
    console.log('state', state);
    state.catalog.favorites = [];
    // TODO: Dispatch deleteAll action.
    this.store.dispatch(new DeleteAllFavoritesMovies());
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Delete all favorites',
      message: 'Are you sure you want to delete all the favorites?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteAll();
          }
        }
      ]
    });

    await alert.present();
  }

}
