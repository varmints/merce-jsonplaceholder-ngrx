import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import CommentState, { getCommentsState } from 'src/app/comments/comment.state';
import * as CommentActions from '../../comments/comment.action';
import * as PostActions from '../../posts/post.action';
import Id from 'src/app/comments/id.model';
import Post from 'src/app/posts/post.model';
import PostState, { getPostState } from 'src/app/posts/post.state';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  constructor(
    private commentStore: Store<{ Comments: CommentState }>,
    private route: ActivatedRoute,
    private router: Router,
    private postStore: Store<{ Posts: PostState }>
  ) {
    this.comment$ = commentStore.pipe(select(getCommentsState));
    this.post$ = postStore.pipe(select(getPostState));
  }
  routerSubscription!: Subscription;
  postId: number = 0;
  commentError: any;
  // get post
  post$: Observable<PostState>;
  postSubscription!: Subscription;
  post: any;
  // get comments
  comment$: Observable<CommentState>;
  commentSubscription!: Subscription;
  commentList: any;

  ngOnInit() {
    this.routeSub();
    this.commentSub();
    this.postSub();
  }
  routeSub() {
    this.routerSubscription = this.route.params.subscribe((params) => {
      this.postId = Number(params.postId);
      this.getComments();
      this.getPost();
    });
  }
  postSub() {
    this.postSubscription = this.post$
      .pipe(
        map((x) => {
          this.post = x.Post;
        })
      )
      .subscribe();
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

  getPost() {
    const id: Id = { id: this.postId };
    this.postStore.dispatch(PostActions.BeginGetPostAction({ payload: id }));
  }

  goToPostList() {
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    if (this.commentSubscription) {
      this.commentSubscription.unsubscribe();
    }
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
