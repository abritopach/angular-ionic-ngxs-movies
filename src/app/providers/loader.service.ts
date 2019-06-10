import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loading: any;

  constructor(private loadingCtrl: LoadingController) { }

  async present(message) {
    this.loading = await this.loadingCtrl.create({
      message: message,
    });

    return await this.loading.present();
  }

  async dismiss() {
    this.loading.dismiss();
    this.loading = null;
  }

}
