import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { DetailComponent } from './detail';
import { DetailComponentRoutingModule } from './detail-routing.module';

import { YoutubeModalComponent } from '../../modals/youtube-modal/youtube.modal';
import { CommentModalComponent } from '../../modals/comment-modal/comment.modal';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DetailComponentRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [DetailComponent, YoutubeModalComponent, CommentModalComponent],
  entryComponents: [DetailComponent, YoutubeModalComponent, CommentModalComponent],
})
export class DetailModule {}
