import { createAction, props } from '@ngrx/store';
import { CommentModel } from '../../models/comment.model';

export const loadComments = createAction('[Comment] Load Comments');

export const loadCommentsSuccess = createAction(
  '[Comment] Load Comments Success',
  props<{ comments: CommentModel[] }>()
);

export const loadCommentsFailure = createAction(
  '[Comment] Load Comments Failure',
  props<{ error: string }>()
);

export const createComment = createAction(
  '[Comment] Create Comment',
  props<{ comment: CommentModel }>()
);

export const createCommentSuccess = createAction(
  '[Comment] Create Comment Success',
  props<{ comment: CommentModel }>()
);

export const createCommentFailure = createAction(
  '[Comment] Create Comment Failure',
  props<{ error: string }>()
);

export const deleteComment = createAction(
  '[Comment] Delete Comment',
  props<{ commentId: number }>()
);

export const deleteCommentSuccess = createAction(
  '[Comment] Delete Comment Success',
  props<{ commentId: number }>()
);

export const deleteCommentFailure = createAction(
  '[Comment] Delete Comment Failure',
  props<{ error: string }>()
);

export const updateComment = createAction(
  '[Comment] Update Comment',
  props<{ commentId: number; updatedData: Partial<CommentModel> }>()
);

export const updateCommentSuccess = createAction(
  '[Comment] Update Comment Success',
  props<{ comment: CommentModel }>()
);

export const updateCommentFailure = createAction(
  '[Comment] Update Comment Failure',
  props<{ error: string }>()
);
