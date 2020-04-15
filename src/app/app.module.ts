import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

// NGXS
import { MovieState } from '../app/store/state/movies.state';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { MoviesService } from './services/movies/movies-service';
import { YoutubeApiService } from './services/youtube-api/youtube-api-service';
import { SearchImageService } from './services/search-image/search-image-service';
import { environment } from '../environments/environment';
// import { GenreCarouselComponent } from './components/genre-carousel/genre-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    // GenreCarouselComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    NgxsModule.forRoot([ MovieState ], { developmentMode: !environment.production }),
    NgxsStoragePluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot()
  ],
  providers: [MoviesService, YoutubeApiService, SearchImageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
