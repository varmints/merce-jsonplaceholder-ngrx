import { createFeatureSelector, createSelector } from '@ngrx/store';
import Comment from './comment.model';

export default class CommentState {
  Comments!: Array<Comment>;
  CommentError: any;
}

export const initializeState = (): CommentState => {
  return { Comments: Array<Comment>(), CommentError: null };
};

export const getCommentState =
  createFeatureSelector<CommentState>('commentFeature');

export const getCommentsState = createSelector(
  getCommentState,
  (state: CommentState) => state
);
