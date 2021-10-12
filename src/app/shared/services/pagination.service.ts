import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import PostState, { getPostsState } from 'src/app/posts/post.state';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private pageSource = new BehaviorSubject(1);
  currentPage = this.pageSource.asObservable();

  private totalPagesSource = new Subject();
  currentTotalPages = this.totalPagesSource.asObservable();

  constructor(private store: Store<{ Posts: PostState }>) {
    this.post$ = store.pipe(select(getPostsState));
  }

  post$: Observable<PostState>;

  nextPage(page: number): void {
    this.pageSource.next(page);
  }

  totalPages() {
    this.totalPagesSource.next();
  }
}
