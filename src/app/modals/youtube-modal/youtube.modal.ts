import { Component, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { ModalController, NavParams} from '@ionic/angular';

import { YoutubePlayerWeb } from 'capacitor-youtube-player';

@Component({
  selector: 'app-youtube-modal',
  templateUrl: 'youtube.modal.html',
  styleUrls: ['./youtube.modal.scss'],
  encapsulation: ViewEncapsulation.None
})
export class YoutubeModalComponent implements OnInit, AfterViewInit {

  item: any;

  constructor(private modalCtrl: ModalController, private navParams: NavParams) {
    console.log('YoutubeModalComponent::constructor | method called');
  }

  ngOnInit() {
    console.log('YoutubeModalComponent::ngOnInit | method called');
    this.item = this.navParams.data.modalProps.item;
  }

  ngAfterViewInit() {
    this.initializeYoutubePlayerPluginWeb();
  }

  dismiss() {
    // Using the injected ModalController this page
    // can "dismiss" itself and pass back data.
    this.destroyYoutubePlayer();
    this.modalCtrl.dismiss();
  }

  async initializeYoutubePlayerPluginWeb() {
    const options = {playerId: this.item.id, playerSize: {width: 640, height: 360}, videoId: this.item.videoId};
    const result = await YoutubePlayerWeb.initialize(options);
    console.log('playerReady', result);
  }

  async destroyYoutubePlayer() {
    const result = await YoutubePlayerWeb.destroy(this.item.id);
    console.log('destroyYoutubePlayer', result);
  }

}
