import { Component, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { ModalController, NavParams} from '@ionic/angular';

import { SearchImageService } from './../../providers/search-image-service';

@Component({
  selector: 'app-show-actors-modal',
  templateUrl: 'show.actors.modal.html',
  styleUrls: ['./show.actors.modal.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowActorsModalComponent implements OnInit {

  actors: any = [];

  constructor(private modalCtrl: ModalController, private navParams: NavParams, private searchImageService: SearchImageService) {
    console.log('ShowActorsModalComponent::constructor | method called');
  }

  ngOnInit() {
    console.log('ShowActorsModalComponent::ngOnInit | method called');
    let actors = this.navParams.data.modalProps.actors;
    actors = actors.split(',');
    // console.log('actors', actors);

    actors.map(actor => {
      // Code to use Google Custom Search Api.
      this.searchImageService.searchImage(actor)
      .subscribe(result => {
        if (result.items.length > 0) {
          // console.log(result);
          this.actors.push({name: actor, image: result.items[0].image.thumbnailLink});
        }
      });
    });
  }

  dismiss() {
    // Using the injected ModalController this page
    // can "dismiss" itself and pass back data.
    // console.log('dismiss', data);
    this.modalCtrl.dismiss();
  }

}
