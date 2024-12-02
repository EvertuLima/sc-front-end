import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommentState } from './comment.reducers';
import { CommentModel } from '../../models/comment.model';

export const selectCommentsState =
  createFeatureSelector<CommentState>('comments');

export const selectComments = createSelector(
  selectCommentsState,
  (comments: CommentState) => comments.comments
);

export const selectCommentsByItemId = (itemId: number) =>
  createSelector(selectComments, (comments: CommentModel[]) => [
    ...comments.filter((comment) => comment.component === +itemId),
  ]);

export const selectMyComments = (userId: number) =>
  createSelector(selectComments, (comments: CommentModel[]) => [
    ...comments.filter((comment) => comment.user === +userId),
  ]);
