import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CommentActions from './comment.action';
import Comment from './comment.model';
import { ApiService } from '../shared/services/api.service';

@Injectable()
export class CommentEffects {
  constructor(private api: ApiService, private action$: Actions) {}

  GetComments$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(CommentActions.BeginGetCommentAction),
      mergeMap((action) =>
        this.api.getComments(action.payload.id).pipe(
          map((data: any) => {
            return CommentActions.SuccessGetCommentAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(CommentActions.ErrorCommentAction(error));
          })
        )
      )
    )
  );

  CreateComment$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(CommentActions.BeginCreateCommentAction),
      mergeMap((action) =>
        this.api.postComments(action.payload).pipe(
          map((data: Comment) => {
            return CommentActions.SuccessCreateCommentAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(CommentActions.ErrorCommentAction(error));
          })
        )
      )
    )
  );
}
