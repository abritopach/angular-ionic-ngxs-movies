import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../providers/movies-service';

import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-page-detail',
  templateUrl: './detail.html',
  styleUrls: ['./detail.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailComponent {

  movie: Movie;

  constructor(private route: ActivatedRoute, private movieService: MoviesService) {

  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    console.log('this.route.snapshot', this.route.snapshot);
    const movieTitle = this.route.snapshot.paramMap.get('title');
    console.log('movieTitle', movieTitle);
    this.getMovie(movieTitle);
  }

  getMovie(title: string) {
    this.movieService.getMovie(title)
    .subscribe(
        data => {
            console.log('movie', data);
            this.movie = data[0];
        },
        error => {
            console.log(<any>error);
      }
    );
  }
}
