import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './home';
import { MovieModalComponent  } from '../../modals/movie-modal/movie.modal';
import { FavoritesMoviesModalComponent } from '../../modals/favorites-movies-modal/favorites.movies.modal';
import { FilterMoviePopoverComponent } from '../../popovers/filter-movie.popover';
import { HomeComponentRoutingModule } from './home-routing.module';

import { NgSelectModule } from '@ng-select/ng-select';

import { StarRatingModule } from 'angular-star-rating';

import { GenreCarouselComponent } from '../../components/genre-carousel/genre-carousel.component';

import { FilterPipe } from '../../pipes/filter.pipe';

import { NtkmeButtonModule } from '@ctrl/ngx-github-buttons';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HomeComponentRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    StarRatingModule.forRoot(),
    NtkmeButtonModule
  ],
  declarations: [HomeComponent, MovieModalComponent, FilterMoviePopoverComponent, FavoritesMoviesModalComponent, GenreCarouselComponent,
                 FilterPipe],
  entryComponents: [HomeComponent, MovieModalComponent, FilterMoviePopoverComponent, FavoritesMoviesModalComponent, GenreCarouselComponent],
})
export class HomeModule {}
