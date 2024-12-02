import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CommentService } from '../../services/commentService/comment.service';
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
  updateCommentFailure,
  updateCommentSuccess,
} from './comment.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CommentEffects {
  constructor(
    private actions$: Actions,
    private commentService: CommentService
  ) {}

  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadComments),
      mergeMap(() =>
        this.commentService.getAllComments().pipe(
          map((comments) => loadCommentsSuccess({ comments: comments })),
          catchError((error) => of(loadCommentsFailure({ error: error })))
        )
      )
    )
  );

  createComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createComment),
      mergeMap(({ comment }) =>
        this.commentService.postComment(comment).pipe(
          map((newCommment) => createCommentSuccess({ comment: newCommment })),
          catchError((error) => of(createCommentFailure({ error: error })))
        )
      )
    )
  );

  updateComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateComment),
      mergeMap(({ commentId, updatedData }) =>
        this.commentService.updadateComment(commentId, updatedData).pipe(
          map((comment) => updateCommentSuccess({ comment: comment })),
          catchError((error) => of(updateCommentFailure({ error: error })))
        )
      )
    )
  );

  deleteComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteComment),
      mergeMap(({ commentId }) =>
        this.commentService.deleteComment(commentId).pipe(
          map(() => deleteCommentSuccess({ commentId: commentId })),
          catchError((error) => of(deleteCommentFailure({ error: error })))
        )
      )
    )
  );
}
