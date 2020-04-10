import { Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { FilterMovies } from '../../store/actions/movies.actions';

@Component({
  selector: 'app-genre-carousel',
  templateUrl: './genre-carousel.component.html',
  styleUrls: ['./genre-carousel.component.css']
})
export class GenreCarouselComponent implements OnInit {

  genres: any;
  filters: any = {
    years: {
      lower: 1900,
      upper: new Date().getFullYear()
    },
    genre: 'Action',
    rating: 0
  };
  selected: Number = -1;

  constructor(private store: Store) {
    this.genres = [
      {text: 'Science fiction', src: 'assets/movies-genres/image1.png'},
      {text: 'Westerns', src: 'assets/movies-genres/image2.png'},
      {text: 'Crime', src: 'assets/movies-genres/image3.png'},
      {text: 'Romance', src: 'assets/movies-genres/image4.png'},
      {text: 'Comedy', src: 'assets/movies-genres/image5.png'},
      {text: 'Drama', src: 'assets/movies-genres/image6.png'},
      {text: 'Cartoon', src: 'assets/movies-genres/image7.png'},
      {text: 'Action', src: 'assets/movies-genres/image8.png'},
      {text: 'Adventure', src: 'assets/movies-genres/image9.png'},
      {text: 'Thriller', src: 'assets/movies-genres/image10.png'},
      {text: 'Fantasy', src: 'assets/movies-genres/image11.png'},
      {text: 'Horror', src: 'assets/movies-genres/image12.png'},
    ];
  }

  ngOnInit() {
  }

  selectGenre(genre, index) {
    console.log('GenreCarouselComponent::selectGenre() | method called', genre);
    this.selected = index;
    this.filters.genre = genre.text;
    this.store.dispatch([
      new FilterMovies(this.filters),
    ]);
  }

}
