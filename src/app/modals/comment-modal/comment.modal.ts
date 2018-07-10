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
    });
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

  commentFormSubmit() {
    console.log('CommentModalComponent::commentFormSubmit | method called');
    // console.log(this.modal.movie);
    // console.log(this.commentForm.value);
    let comments;
    if (typeof this.modal.movie.comments === 'undefined') {
      comments = [];
    } else {
      comments = this.modal.movie.comments;
    }
    // console.log('comments', comments);
    comments.push(this.commentForm.value.comment);
    this.modal.movie.comments = comments;
    this.store.dispatch(new EditMovie(this.modal.movie));
  }

}
