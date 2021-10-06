import { createAction, props } from '@ngrx/store';
import Comment from './comment.model';
import Id from './id.model';

export const GetCommentAction = createAction(
  '[Comment] - Get Comment',
  props<Id>()
);

export const BeginGetCommentAction = createAction(
  '[Comment] - Begin Get Comment',
  props<{ payload: Id }>()
);

export const SuccessGetCommentAction = createAction(
  '[Comment] - Success Get Comment',
  props<{ payload: Comment[] }>()
);

export const ErrorCommentAction = createAction(
  '[Comment] - Error',
  props<Error>()
);
