import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import Comment from 'src/app/comments/comment.model';
import CommentState, { getCommentsState } from 'src/app/comments/comment.state';
import * as CommentActions from '../../comments/comment.action';
import Id from 'src/app/comments/id.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private commentStore: Store<{ Comments: CommentState }>
  ) {
    this.comment$ = commentStore.pipe(select(getCommentsState));
  }

  routerSubscription!: Subscription;
  postId: number = 0;
  commentError: any;
  // get comments
  comment$: Observable<CommentState>;
  commentSubscription!: Subscription;
  commentList: any;

  // add comment
  isCommentFormShow: boolean = false;
  commentForm = new FormGroup({
    postId: new FormControl(0),
    id: new FormControl(501),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    body: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.routeSub();
    this.commentSub();
  }

  routeSub() {
    this.routerSubscription = this.route.params.subscribe((params) => {
      this.postId = Number(params.postId);
      this.getComments();
    });
  }

  commentSub() {
    this.commentSubscription = this.comment$
      .pipe(
        map((x) => {
          this.commentList = x.Comments;
          this.commentError = x.CommentError;
        })
      )
      .subscribe();
  }

  getComments() {
    const id: Id = { id: this.postId };
    this.commentStore.dispatch(
      CommentActions.BeginGetCommentAction({ payload: id })
    );
  }

  postComment(val: Comment) {
    const comment: Comment = val;
    comment.postId = this.postId;
    this.commentStore.dispatch(
      CommentActions.BeginCreateCommentAction({ payload: comment })
    );
  }

  onSubmit(val: Comment) {
    this.postComment(val);
    this.resetForm();
    this.toggleDisplay();
  }

  resetForm() {
    this.commentForm.reset();
  }

  toggleDisplay() {
    this.isCommentFormShow = !this.isCommentFormShow;
  }

  ngOnDestroy() {
    if (this.commentSubscription) {
      this.commentSubscription.unsubscribe();
    }
  }
}
