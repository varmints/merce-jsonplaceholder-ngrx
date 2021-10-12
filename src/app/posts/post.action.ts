import { createAction, props } from '@ngrx/store';
import Id from '../comments/id.model';
import Post from './post.model';

export const GetPostsAction = createAction('[Post] - Get Posts');

export const BeginGetPostsAction = createAction(
  '[Post] - Begin Get Posts',
  props<{ page: number }>()
);

export const SuccessGetPostsAction = createAction(
  '[Post] - Success Get Posts',
  props<{ payload: Post[] }>()
);

export const GetPostAction = createAction('[Post] - Get Post', props<Id>());

export const BeginGetPostAction = createAction(
  '[Post] - Begin Get Post',
  props<{ payload: Id }>()
);

export const SuccessGetPostAction = createAction(
  '[Post] - Success Get Post',
  props<{ payload: Post }>()
);

export const ErrorPostAction = createAction('[Post] - Error', props<Error>());
