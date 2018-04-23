import { Component, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-movie',
  templateUrl: 'add-movie.modal.html',
  styleUrls: ['./add-movie.modal.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddMovieModalComponent {

  constructor(private modalCtrl: ModalController) { }

  dismiss(data?: any) {
    // Using the injected ModalController this page
    // can "dismiss" itself and pass back data.
    this.modalCtrl.dismiss(data);
  }
}
