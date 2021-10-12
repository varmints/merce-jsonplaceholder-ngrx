import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import Post from 'src/app/posts/post.model';
import PostState, { getPostsState } from 'src/app/posts/post.state';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import * as PostActions from '../../posts/post.action';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  constructor(
    private store: Store<{ Posts: PostState }>,
    private router: Router,
    private data: PaginationService
  ) {
    this.post$ = store.pipe(select(getPostsState));
  }

  page!: number;
  subscription!: Subscription;
  post$: Observable<PostState>;
  postSubscription!: Subscription;
  postList: Post[] = [];
  postError: any;

  ngOnInit() {
    this.subscription = this.data.currentPage.subscribe(
      (page) => (this.page = page)
    );
    this.postSubscription = this.post$
      .pipe(
        map((x) => {
          this.postList = x.Posts;
          this.postError = x.PostError;
        })
      )
      .subscribe();

    this.store.dispatch(PostActions.BeginGetPostsAction({ page: this.page }));
  }

  goTo(post: Post) {
    this.router.navigate(['/post/' + post.id]);
  }

  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
