import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home';
import { MovieModalComponent  } from '../../modals/movie.modal';
import { FilterMoviePopoverComponent } from '../../popovers/filter-movie.popover';
import { HomeComponentRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HomeComponentRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HomeComponent, MovieModalComponent, FilterMoviePopoverComponent],
  entryComponents: [HomeComponent, MovieModalComponent, FilterMoviePopoverComponent],
})
export class HomeModule {}
