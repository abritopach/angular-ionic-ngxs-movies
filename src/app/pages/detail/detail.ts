import { Component, ViewEncapsulation } from '@angular/core';

import { Movie } from '../../models/movie.model';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { YoutubeApiService } from '../../providers/youtube-api-service';

import { Plugins, Capacitor } from '@capacitor/core';

import {default as iziToast, IziToastSettings} from 'izitoast';

import { ModalController } from '@ionic/angular';
import { YoutubeModalComponent } from '../../modals/youtube-modal/youtube.modal';
import { CommentModalComponent } from '../../modals/comment-modal/comment.modal';
import { ShowCommentsModalComponent } from '../../modals/show-comments-modal/show.comments.modal';

import { LikeMovie, FavoriteMovie } from '../../store/actions/movies.actions';

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
                           'horror', 'romance', 'science fiction', 'westerns', 'animation'];
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

  constructor(private store: Store, private youtubeApiService: YoutubeApiService, private modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    // console.log('ionViewWillEnter');

    this.selectedMovie = this.store.select(state => state.catalog.selectedMovie);

    this.selectedMovie.subscribe(
      data => {
          // console.log(data);
          this.movie = data;
          if (this.movie !== null) {
            const genre = this.movie.genre.toLowerCase().split(',', 1)[0];
            if (this.genreImages.indexOf(genre) !== -1) {
              this.movie.genreImage = 'assets/movies-genres/' + genre + '.png';
            }
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

  onClickLike() {
    console.log('DetailsPage::onClickLike');
    console.log(this.movie);
    if (typeof this.movie.likes === 'undefined') {
      this.movie.likes = 0;
    }
    console.log(this.movie.likes);
    this.movie.likes += 1;
    this.store.dispatch(new LikeMovie(this.movie));
  }

  async presentCommentModal() {
    console.log('DetailsPage::presentCommentModal');

    const componentProps = { modalProps: { title: 'Comment', movie: this.movie}};

    const modal = await this.modalCtrl.create({
      component: CommentModalComponent,
      componentProps: componentProps
    });
    await modal.present();

    const {data} = await modal.onWillDismiss();
    if (data) {
      console.log('data', data);
    }
  }

  onClickComment() {
    console.log('DetailsPage::onClickComment');
    this.presentCommentModal();
  }

  async presentShowCommentsModal() {
    console.log('DetailsPage::presentShowCommentsModal');

    const componentProps = { modalProps: { title: 'Comments', movie: this.movie}};

    const modal = await this.modalCtrl.create({
      component: ShowCommentsModalComponent,
      componentProps: componentProps
    });
    await modal.present();

    const {data} = await modal.onWillDismiss();
    if (data) {
      console.log('data', data);
    }
  }

  onClickShowComment() {
    console.log('DetailsPage::onClickShowComment');
    this.presentShowCommentsModal();
  }

  onClickFavorite() {
    console.log('DetailsPage::onClickFavorite');
    this.store.dispatch(
      new FavoriteMovie(this.movie)).subscribe(() => {
      const newSettings: IziToastSettings = {title: 'Favorite movie', message: 'Favorite Movie added.', position: 'bottomLeft'};
      iziToast.success({...this.defaultIziToastSettings, ...newSettings});
    });
  }

}
