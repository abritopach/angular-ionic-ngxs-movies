import { Component, ViewEncapsulation } from '@angular/core';

import { MoviesService } from '../../providers/movies-service';

import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-page-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {

  movies: Movie[] = [];

  constructor(private moviesService: MoviesService) {
    this.moviesService.getMovies()
    .subscribe(
        data => {
            console.log(data);
            this.movies = data;
        },
        error => {
            console.log(<any>error);
      }
    );
  }
}
