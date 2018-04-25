import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home';
import { MovieModalComponent  } from '../../modals/movie.modal';
import { HomeComponentRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HomeComponentRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HomeComponent, MovieModalComponent],
  entryComponents: [HomeComponent, MovieModalComponent],
})
export class HomeModule {}
