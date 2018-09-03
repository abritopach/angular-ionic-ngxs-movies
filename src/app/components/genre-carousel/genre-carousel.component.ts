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
      {src: 'assets/movies-genres/image1.png'},
      {src: 'assets/movies-genres/image2.png'},
      {src: 'assets/movies-genres/image3.png'},
      {src: 'assets/movies-genres/image4.png'},
      {src: 'assets/movies-genres/image5.png'},
      {src: 'assets/movies-genres/image6.png'},
      {src: 'assets/movies-genres/image7.png'},
      {src: 'assets/movies-genres/image8.png'},
      {src: 'assets/movies-genres/image9.png'},
      {src: 'assets/movies-genres/image10.png'},
      {src: 'assets/movies-genres/image11.png'},
      {src: 'assets/movies-genres/image12.png'},
    ];
  }

  ngOnInit() {
  }

}
