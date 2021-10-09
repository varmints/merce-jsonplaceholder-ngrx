import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as PostActions from '../../posts/post.action';
import Id from 'src/app/comments/id.model';
import PostState, { getPostState } from 'src/app/posts/post.state';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postStore: Store<{ Posts: PostState }>
  ) {
    this.post$ = postStore.pipe(select(getPostState));
  }

  routerSubscription!: Subscription;
  postId: number = 0;
  // get post
  post$: Observable<PostState>;
  postSubscription!: Subscription;
  post: any;

  ngOnInit() {
    this.routeSub();
    this.postSub();
  }

  routeSub() {
    this.routerSubscription = this.route.params.subscribe((params) => {
      this.postId = Number(params.postId);
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

  getPost() {
    const id: Id = { id: this.postId };
    this.postStore.dispatch(PostActions.BeginGetPostAction({ payload: id }));
  }

  goToPostList() {
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
