import { Action, createReducer, on } from '@ngrx/store';
import * as CommentActions from './comment.action';
import CommentState, { initializeState } from './comment.state';

export const intialState = initializeState();

const reducer = createReducer(
  intialState,

  on(CommentActions.GetCommentAction, (state) => state),

  on(
    CommentActions.SuccessGetCommentAction,
    (state: CommentState, { payload }) => {
      return { ...state, Comments: payload };
    }
  ),

  on(CommentActions.ErrorCommentAction, (state: CommentState, error: Error) => {
    console.log(error);
    return { ...state, CommentError: error };
  }),

  on(CommentActions.CreateCommentAction, (state, comment) => {
    return {
      ...state,
      Comments: [...state.Comments, comment],
      CommentError: null,
    };
  }),

  on(
    CommentActions.SuccessCreateCommentAction,
    (state: CommentState, { payload }) => {
      return {
        ...state,
        Comments: [...state.Comments, payload],
        CommentError: null,
      };
    }
  )
);

export function CommentReducer(
  state: CommentState | undefined,
  action: Action
) {
  return reducer(state, action);
}
