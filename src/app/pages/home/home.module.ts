import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HomeComponent } from './home';
import { AddMovieModalComponent  } from '../../modals/add-movie.modal';
import { HomeComponentRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HomeComponentRoutingModule
  ],
  declarations: [HomeComponent, AddMovieModalComponent],
  entryComponents: [HomeComponent, AddMovieModalComponent],
})
export class HomeModule {}
