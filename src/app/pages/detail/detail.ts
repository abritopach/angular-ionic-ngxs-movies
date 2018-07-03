import { Component, ViewEncapsulation } from '@angular/core';

import { Movie } from '../../models/movie.model';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { YoutubeApiService } from '../../providers/youtube-api-service';

import { Plugins, Capacitor } from '@capacitor/core';

import {default as iziToast, IziToastSettings} from 'izitoast';

import { ModalController } from '@ionic/angular';
import { YoutubeModalComponent } from '../../modals/youtube-modal/youtube.modal';

@Component({
  selector: 'app-page-detail',
  templateUrl: './detail.html',
  styleUrls: ['./detail.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailComponent {

  currentYear = new Date().getFullYear();
  selectedMovie: Observable<Movie>;
  movie: Movie;
  genreImages: string[] = ['action', 'comedy', 'crime', 'documentary', 'drama', 'fantasy', 'film noir',
                           'horror', 'romance', 'science fiction', 'westerns'];

  constructor(private store: Store, private youtubeApiService: YoutubeApiService, private modalCtrl: ModalController) {

  }

  ionViewWillEnter() {
    // console.log('ionViewWillEnter');

    this.selectedMovie = this.store.select(state => state.catalog.selectedMovie);

    this.selectedMovie.subscribe(
      data => {
          // console.log(data);
          this.movie = data;
          if (this.genreImages.indexOf(this.movie.genre.toLowerCase()) !== -1) {
            this.movie.genreImage = 'assets/movies-genres/' + this.movie.genre.toLowerCase() + '.png';
          }
      },
      error => {
          console.log(<any>error);
      }
    );
  }

  watchTrailer() {
    console.log('DetailsPage::watchTrailer | method called');

    // Code to use Youtube Api Service: providers/youtube-api-service.ts
    this.youtubeApiService.searchMovieTrailer(this.movie.title)
    .subscribe(result => {
      if (result.items.length > 0) {
        console.log(result);
        const { videoId } = result.items[0].id;
        this.movie.videoId = videoId;

        // Code to use capacitor-youtube-player plugin.
        console.log('DetailsPage::watchTrailer -> platform: ' + Capacitor.platform);
        if (Capacitor.platform === 'web') {
          this.presentModal();
        } else { // Native
          this.testYoutubePlayerPlugin();
        }

        /*
        if (Capacitor.platform === 'web') {
          window.open('https://www.youtube.com/watch?v=' + videoId);
        } else { // TODO: Use capacitor-youtube-player plugin.
          window.open('https://www.youtube.com/watch?v=' + videoId, '_blank');
        }
        */
      }
    },
    error => {
      iziToast.show({
        color: 'red',
        title: 'Watch Trailer',
        icon: 'ico-error',
        message: 'Sorry, an error has occurred.',
        position: 'bottomLeft',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        image: 'assets/avatar.png',
        imageWidth: 70,
        layout: 2,
      });
    });

  }

  async presentModal() {
    console.log('DetailsPage::presentModal | method called -> movie', this.movie);
    const componentProps = { modalProps: { item: this.movie}};
    const modal = await this.modalCtrl.create({
      component: YoutubeModalComponent,
      componentProps: componentProps
    });
    await modal.present();

    const {data} = await modal.onWillDismiss();
    if (data) {
      console.log('data', data);
    }
  }

  async testYoutubePlayerPlugin() {

    const { YoutubePlayer } = Plugins;

    const result = await YoutubePlayer.echo({value: 'hola' });
    console.log('result', result);

    const options = {width: 640, height: 360, videoId: this.movie.videoId};
    const playerReady = await YoutubePlayer.initialize(options);
  }

}
