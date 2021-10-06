import { createFeatureSelector, createSelector } from '@ngrx/store';
import Post from './post.model';

export default class PostState {
  Posts!: Array<Post>;
  PostError: any;
  Post?: Post;
}

export const initializeState = (): PostState => {
  return { Posts: Array<Post>(), PostError: null };
};

export const getPostState = createFeatureSelector<PostState>('postFeature');

export const getPostsState = createSelector(
  getPostState,
  (state: PostState) => state
);
