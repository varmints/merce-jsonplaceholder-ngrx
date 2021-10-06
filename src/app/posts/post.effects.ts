import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as PostActions from './post.action';
import Post from './post.model';
import { ApiService } from '../shared/services/api.service';

@Injectable()
export class PostEffects {
  constructor(private api: ApiService, private action$: Actions) {}

  GetPosts$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.BeginGetPostsAction),
      mergeMap((action) =>
        this.api.getPosts().pipe(
          map((data: Post[]) => {
            return PostActions.SuccessGetPostsAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(PostActions.ErrorPostAction(error));
          })
        )
      )
    )
  );

  GetPost$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.BeginGetPostAction),
      mergeMap((action) =>
        this.api.getPost(action.payload.id).pipe(
          map((data: Post) => {
            return PostActions.SuccessGetPostAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(PostActions.ErrorPostAction(error));
          })
        )
      )
    )
  );
}
