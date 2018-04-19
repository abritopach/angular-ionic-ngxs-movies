import { Component, ViewEncapsulation } from '@angular/core';

import { MoviesService } from '../../providers/movies-service';

import { Movie } from '../../models/movie.model';

// import { InfiniteScroll } from '@ionic/core';

import { InfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-page-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {

  movies: Movie[] = [];
  start: number;
  end: number;
  items = [];

  constructor(private moviesService: MoviesService) {
    this.start = 0;
    this.end = 20;
    this.moviesService.getMovies(this.start, this.end)
    .subscribe(
        data => {
            console.log(data);
            this.movies = data;
        },
        error => {
            console.log(<any>error);
      }
    );
    /*
    for (let i = 0; i < 30; i++) {
      this.items.push( this.items.length );
    }
    console.log('items', this.items);
    */
  }

  doInfinite(infiniteScroll: InfiniteScroll) {
    console.log('Begin async operation');
    console.log(infiniteScroll);
    this.start = this.end;
    this.end += 20;
    this.moviesService.getMovies(this.start, this.end)
    .subscribe(
        data => {
            console.log(data);
            setTimeout(() => {
              console.log('Async operation has ended');
              this.movies = [...this.movies, ...data];
              if (infiniteScroll) {
                infiniteScroll.complete();
              }
            }, 500);
        },
        error => {
            console.log(<any>error);
            infiniteScroll.complete();
      }
    );
  }

  /*
 doInfinite(infiniteScroll: InfiniteScroll) {
  console.log('Begin async operation');
  console.log(infiniteScroll);

  setTimeout(() => {
    for (let i = 0; i < 30; i++) {
      this.items.push( this.items.length );
    }

    console.log('items', this.items);

    console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 500);
}
*/

}
