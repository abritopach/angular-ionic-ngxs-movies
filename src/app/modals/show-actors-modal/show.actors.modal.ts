import { forkJoin } from 'rxjs';
import { Component, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { ModalController, NavParams} from '@ionic/angular';

import { SearchImageService } from '../../services/search-image/search-image-service';

import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-show-actors-modal',
  templateUrl: 'show.actors.modal.html',
  styleUrls: ['./show.actors.modal.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowActorsModalComponent implements OnInit {

  actors: any = [];

  constructor(private modalCtrl: ModalController, private navParams: NavParams, private searchImageService: SearchImageService,
              private loaderService: LoaderService) {
    console.log('ShowActorsModalComponent::constructor | method called');
  }

  ngOnInit() {
    console.log('ShowActorsModalComponent::ngOnInit | method called');

    this.loaderService.present('Please wait, loading actors...');
    let actors = this.navParams.data.modalProps.actors;
    actors = actors.split(',');

    forkJoin(
      actors.map(actor => {
        // Code to use Google Custom Search Api.
        return this.searchImageService.searchImage(actor);
      })
    ).subscribe(results => {
      if (results.length > 0) {
        results.map((result, index) => {
          this.actors.push({name: actors[index], image: result['items'][0].image.thumbnailLink});
        });
        this.loaderService.dismiss();
      }
    });
  }

  dismiss() {
    // Using the injected ModalController this page
    // can "dismiss" itself and pass back data.
    this.modalCtrl.dismiss();
  }

}
