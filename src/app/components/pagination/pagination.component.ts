import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import PostState from 'src/app/posts/post.state';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import * as PostActions from '../../posts/post.action';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  page!: number;
  totalPages!: number;
  subscription!: Subscription;

  constructor(
    private store: Store<{ Posts: PostState }>,
    private data: PaginationService
  ) {}

  ngOnInit(): void {
    this.subscription = this.data.currentPage.subscribe(
      (page) => (this.page = page)
    );
  }

  onNextPage(): void {
    this.page++;
    this.data.nextPage(this.page);
    this.store.dispatch(PostActions.BeginGetPostsAction({ page: this.page }));
  }

  onPreviousPage(): void {
    this.page--;
    this.data.nextPage(this.page);
    this.store.dispatch(PostActions.BeginGetPostsAction({ page: this.page }));
  }

  getTotalPages() {
    // this.totalPages = Math.ceil(this.fetchedData.length / this.itemsPerPage);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
