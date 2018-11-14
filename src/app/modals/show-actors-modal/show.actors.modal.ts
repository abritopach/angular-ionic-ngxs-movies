import { Component, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-show-actors-modal',
  templateUrl: 'show.actors.modal.html',
  styleUrls: ['./show.actors.modal.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowActorsModalComponent implements OnInit {

  item: any;

  constructor(private modalCtrl: ModalController, private navParams: NavParams) {
    console.log('ShowActorsModalComponent::constructor | method called');
  }

  ngOnInit() {
    console.log('ShowActorsModalComponent::ngOnInit | method called');
  }

  dismiss() {
    // Using the injected ModalController this page
    // can "dismiss" itself and pass back data.
    // console.log('dismiss', data);
    this.modalCtrl.dismiss();
  }

}
