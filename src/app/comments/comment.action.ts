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

export const CreateCommentAction = createAction(
  '[Comment] - Create Comment',
  props<Comment>()
);

export const BeginCreateCommentAction = createAction(
  '[Comment] - Begin Create Comment',
  props<{ payload: Comment }>()
);

export const SuccessCreateCommentAction = createAction(
  '[Comment] - Sucess Create Comment',
  props<{ payload: Comment }>()
);
