import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { EditMovie } from '@store/actions/movies.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-comment-modal',
  templateUrl: 'comment.modal.html',
  styleUrls: ['./comment.modal.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommentModalComponent implements OnInit {
  commentForm: FormGroup;

  modal: any = {
    title: ''
  };

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private navParams: NavParams,
    private store: Store
  ) {
    this.createForm();
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: new FormControl('', Validators.required),
      rating: new FormControl('')
    });
  }

  ngOnInit() {
    this.modal = { ...this.navParams.data.modalProps };
  }

  dismiss() {
    // Using the injected ModalController this page
    // can "dismiss" itself and pass back data.
    this.modalCtrl.dismiss();
  }

  commentFormSubmit() {
    let comments;
    let movieToUpdate = { ...this.modal.movie };
    if (typeof this.modal.movie.comments === 'undefined') {
      comments = [];
    } else {
      comments = [...this.modal.movie.comments];
    }

    if (typeof this.modal.movie.rate === 'undefined') {
      movieToUpdate = {
        ...movieToUpdate,
        rate: this.commentForm.value.rating,
        numVotes: 1
      };
    } else {
      movieToUpdate = {
        ...movieToUpdate,
        numVotes: movieToUpdate.numVotes + 1,
        rate:
          (movieToUpdate.rate + this.commentForm.value.rating) /
          movieToUpdate.numVotes
      };
    }

    comments.push(this.commentForm.value.comment);
    movieToUpdate.comments = comments;
    this.store.dispatch(new EditMovie(movieToUpdate));
  }

  onRatingChange(event) {
    this.commentForm.patchValue({ rating: event.detail });
  }
}
