import { forkJoin } from 'rxjs';
import { Component, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { ModalController, NavParams, LoadingController} from '@ionic/angular';

import { SearchImageService } from './../../providers/search-image-service';

@Component({
  selector: 'app-show-actors-modal',
  templateUrl: 'show.actors.modal.html',
  styleUrls: ['./show.actors.modal.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowActorsModalComponent implements OnInit {

  actors: any = [];
  loading: any;

  constructor(private modalCtrl: ModalController, private navParams: NavParams, private searchImageService: SearchImageService,
              private loadingCtrl: LoadingController) {
    console.log('ShowActorsModalComponent::constructor | method called');
  }

  ngOnInit() {
    console.log('ShowActorsModalComponent::ngOnInit | method called');

    this.presentLoading();
    let actors = this.navParams.data.modalProps.actors;
    actors = actors.split(',');
    // console.log('actors', actors);

    /*
    actors.map(actor => {
      // Code to use Google Custom Search Api.
      this.searchImageService.searchImage(actor)
      .subscribe(result => {
        if (result.items.length > 0) {
          // console.log(result);
          this.actors.push({name: actor, image: result.items[0].image.thumbnailLink});
          this.dismissLoading();
        }
      });
    });
    */

    forkJoin(
      actors.map(actor => {
        // Code to use Google Custom Search Api.
        return this.searchImageService.searchImage(actor);
      })
    ).subscribe(results => {
      // console.log(results);
      if (results.length > 0) {
        results.map((result, index) => {
          // console.log(result);
          this.actors.push({name: actors[index], image: result['items'][0].image.thumbnailLink});
        });
        this.dismissLoading();
      }
    });
  }

  dismiss() {
    // Using the injected ModalController this page
    // can "dismiss" itself and pass back data.
    // console.log('dismiss', data);
    this.modalCtrl.dismiss();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait, loading actors...',
    });

    return await this.loading.present();
  }

  async dismissLoading() {
    this.loading.dismiss();
  }

}
