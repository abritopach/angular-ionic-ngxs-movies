import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './home';
import { MovieModalComponent  } from '../../modals/movie-modal/movie.modal';
import { FilterMoviePopoverComponent } from '../../popovers/filter-movie.popover';
import { HomeComponentRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HomeComponentRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [HomeComponent, MovieModalComponent, FilterMoviePopoverComponent],
  entryComponents: [HomeComponent, MovieModalComponent, FilterMoviePopoverComponent],
})
export class HomeModule {}
