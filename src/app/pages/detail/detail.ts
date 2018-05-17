import { Component, ViewEncapsulation } from '@angular/core';

import { Movie } from '../../models/movie.model';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { YoutubeApiService } from '../../providers/youtube-api-service';

import { Plugins, Capacitor } from '@capacitor/core';

import {default as iziToast, IziToastSettings} from 'izitoast';

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

  constructor(private store: Store, private youtubeApiService: YoutubeApiService) {

  }

  ionViewWillEnter() {
    // console.log('ionViewWillEnter');

    this.selectedMovie = this.store.select(state => state.catalog.selectedMovie);

    this.selectedMovie.subscribe(
      data => {
          // console.log(data);
          this.movie = data;
      },
      error => {
          console.log(<any>error);
      }
    );
  }

  watchTrailer() {
    console.log('watchTrailer');
    this.youtubeApiService.searchMovieTrailer(this.movie.title)
    .subscribe(result => {
      if (result.items.length > 0) {
        console.log(result);
        const { videoId } = result.items[0].id;

        if (Capacitor.platform === 'web') {
          window.open('https://www.youtube.com/watch?v=' + videoId);
        } else { // TODO: Use capacitor-youtube-player plugin.
          window.open('https://www.youtube.com/watch?v=' + videoId, '_blank');
        }
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

}
