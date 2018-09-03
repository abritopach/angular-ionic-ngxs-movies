import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-genre-carousel',
  templateUrl: './genre-carousel.component.html',
  styleUrls: ['./genre-carousel.component.css']
})
export class GenreCarouselComponent implements OnInit {

  genres: any;

  constructor() {
    this.genres = [
      {text: 'Science fiction', src: 'assets/movies-genres/image1.png'},
      {text: 'Hola', src: 'assets/movies-genres/image2.png'},
      {text: 'Crime', src: 'assets/movies-genres/image3.png'},
      {text: 'Romance', src: 'assets/movies-genres/image4.png'},
      {text: 'Hola', src: 'assets/movies-genres/image5.png'},
      {text: 'Drama', src: 'assets/movies-genres/image6.png'},
      {text: 'Animation', src: 'assets/movies-genres/image7.png'},
      {text: 'Hola', src: 'assets/movies-genres/image8.png'},
      {text: 'Westerns', src: 'assets/movies-genres/image9.png'},
      {text: 'Horror', src: 'assets/movies-genres/image10.png'},
      {text: 'Hola', src: 'assets/movies-genres/image11.png'},
      {text: 'Hola', src: 'assets/movies-genres/image12.png'},
    ];
  }

  ngOnInit() {
  }

}
