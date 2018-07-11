import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-show-comments-modal',
  templateUrl: 'show.comments.modal.html',
  styleUrls: ['./show.comments.modal.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowCommentsModalComponent implements OnInit {

  modal: any = {
    title: ''
  };

  constructor(private modalCtrl: ModalController, private navParams: NavParams) {
  }

  ngOnInit() {
    this.modal = { ...this.navParams.data.modalProps};
  }

  dismiss() {
    // Using the injected ModalController this page
    // can "dismiss" itself and pass back data.
    // console.log('dismiss', data);
    this.modalCtrl.dismiss();
  }

}
