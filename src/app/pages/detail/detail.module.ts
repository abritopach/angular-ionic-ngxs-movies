import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { DetailComponent } from './detail';
import { DetailComponentRoutingModule } from './detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DetailComponentRoutingModule
  ],
  declarations: [DetailComponent],
  entryComponents: [DetailComponent],
})
export class DetailModule {}
