import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { DetailComponent } from './detail';
import { DetailComponentRoutingModule } from './detail-routing.module';

import { YoutubeModalComponent } from '../../modals/youtube-modal/youtube.modal';
import { CommentModalComponent } from '../../modals/comment-modal/comment.modal';
import { ShowCommentsModalComponent } from '../../modals/show-comments-modal/show.comments.modal';
import { ShowActorsModalComponent } from './../../modals/show-actors-modal/show.actors.modal';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { StarRatingModule } from 'angular-star-rating';

import { NtkmeButtonModule } from '@ctrl/ngx-github-buttons';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        DetailComponentRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        StarRatingModule.forRoot(),
        NtkmeButtonModule
    ],
    declarations: [DetailComponent, YoutubeModalComponent, CommentModalComponent, ShowCommentsModalComponent,
    ShowActorsModalComponent],
    entryComponents: [DetailComponent, YoutubeModalComponent, CommentModalComponent, ShowCommentsModalComponent,
    ShowActorsModalComponent],
})
export class DetailModule {}
