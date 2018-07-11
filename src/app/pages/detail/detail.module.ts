import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { DetailComponent } from './detail';
import { DetailComponentRoutingModule } from './detail-routing.module';

import { YoutubeModalComponent } from '../../modals/youtube-modal/youtube.modal';
import { CommentModalComponent } from '../../modals/comment-modal/comment.modal';
import { ShowCommentsModalComponent } from '../../modals/show-comments-modal/show.comments.modal';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { StarRatingModule } from 'angular-star-rating';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DetailComponentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StarRatingModule.forRoot()
  ],
  declarations: [DetailComponent, YoutubeModalComponent, CommentModalComponent, ShowCommentsModalComponent],
  entryComponents: [DetailComponent, YoutubeModalComponent, CommentModalComponent, ShowCommentsModalComponent],
})
export class DetailModule {}
