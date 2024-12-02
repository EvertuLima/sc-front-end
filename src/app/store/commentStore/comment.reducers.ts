import { createReducer, on } from '@ngrx/store';
import { CommentModel } from '../../models/comment.model';
import {
  createComment,
  createCommentFailure,
  createCommentSuccess,
  deleteComment,
  deleteCommentFailure,
  deleteCommentSuccess,
  loadComments,
  loadCommentsFailure,
  loadCommentsSuccess,
  updateComment,
  updateCommentSuccess,
} from './comment.actions';

export interface CommentState {
  comments: CommentModel[];
  loading: boolean;
  error: string | null;
}

export const initialState: CommentState = {
  comments: [],
  loading: true,
  error: null,
};

export const commentReducer = createReducer(
  initialState,
  on(loadComments, (state) => ({ ...state, loading: true })),
  on(loadCommentsSuccess, (state, { comments }) => ({
    ...state,
    comments: comments,
    loading: false,
  })),
  on(loadCommentsFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  on(createComment, (state) => ({
    ...state,
    error: null,
  })),
  on(createCommentSuccess, (state, { comment }) => ({
    ...state,
    comments: [comment, ...state.comments],
    error: null,
  })),
  on(createCommentFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(deleteComment, (state) => ({ ...state })),
  on(deleteCommentSuccess, (state, { commentId }) => ({
    ...state,
    comments: [...state.comments.filter((comment) => comment.id !== commentId)],
    error: null,
  })),
  on(deleteCommentFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(updateComment, (state) => ({ ...state, error: null })),
  on(updateCommentSuccess, (state, { comment }) => ({
    ...state,
    comments: state.comments.map((c) =>
      c.id === comment.id ? { ...c, ...comment } : c
    ),
  })),
  on(deleteCommentFailure, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
