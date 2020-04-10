import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { EditMovie } from '../../store/actions/movies.actions';
import { Store, Actions } from '@ngxs/store';

@Component({
  selector: 'app-comment-modal',
  templateUrl: 'comment.modal.html',
  styleUrls: ['./comment.modal.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommentModalComponent implements OnInit {

  commentForm: FormGroup;

  modal: any = {
    title: '',
  };

  constructor(private modalCtrl: ModalController, private formBuilder: FormBuilder, private navParams: NavParams, private store: Store) {
    this.createForm();
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: new FormControl('', Validators.required),
      rating: new FormControl('')
    });
  }


  ngOnInit() {
    this.modal = { ...this.navParams.data.modalProps};
  }

  dismiss() {
    // Using the injected ModalController this page
    // can "dismiss" itself and pass back data.
    this.modalCtrl.dismiss();
  }

  commentFormSubmit() {
    console.log('CommentModalComponent::commentFormSubmit | method called');
    let comments;
    if (typeof this.modal.movie.comments === 'undefined') {
      comments = [];
    } else {
      comments = this.modal.movie.comments;
    }

    if (typeof this.modal.movie.rate === 'undefined') {
      this.modal.movie.rate = this.commentForm.value.rating;
      this.modal.movie.numVotes = 1;
    } else {
      this.modal.movie.numVotes += 1;
      this.modal.movie.rate = (this.modal.movie.rate + this.commentForm.value.rating) / this.modal.movie.numVotes;
    }

    comments.push(this.commentForm.value.comment);
    this.modal.movie.comments = comments;
    this.store.dispatch(new EditMovie(this.modal.movie));
  }

}
