import { Component, Input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CommentModel } from '../../../models/comment.model';
import { selectCurrentUserId } from '../../../store/userStore/user.selectors';
import { DeleteCommentDialogComponent } from '../../../messages/delete-comment-dialog/delete-comment-dialog.component';
import { deleteComment } from '../../../store/commentStore/comment.actions';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [
    AsyncPipe,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    CommentFormComponent
  ],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent {
  @Input({ required: true }) comments$!: Observable<CommentModel[]>;
  @Input({ required: true }) itemId!: number;
  @Input() allowCreateComment: boolean = true;

  currentUserId$: Observable<number>;
  formMode: 'create' | 'edit' | null = null;
  commentToEdit: CommentModel | null = null;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.currentUserId$ = this.store.select(selectCurrentUserId);
  }

  onMouseEnter(event: MouseEvent): void {
    if (!this.allowCreateComment) {
      const target = event.currentTarget as HTMLElement;
      target?.classList.add('hovered');
    }
  }

  onMouseLeave(event: MouseEvent): void {
    if (!this.allowCreateComment) {
      const target = event.currentTarget as HTMLElement;
      target?.classList.remove('hovered');
    }
  }

  onCommentCardClick(comment: CommentModel): void {
    if (!this.allowCreateComment) {
      this.goToItemDetail(comment.component);
    }
  }

  openCreateCommentForm() {
    this.formMode = 'create'
    this.commentToEdit = {
      id: 0,
      component: this.itemId,
      component_description: "",
      comment: "",
      user: 0,
      user_name: "",
      created_at: "",
      updated_at: "",
    }
  }

  openEditCommentForm(comment: CommentModel) {
    this.formMode = 'edit'
    this.commentToEdit = { ...comment }
  }

  closeCommentForm() {
    this.formMode = null;
    this.commentToEdit = null;
  }

  onFormSubmitted() {
    this.closeCommentForm();
  }

  onDeleteComment(commentId: number) {
    const dialogRef = this.dialog.open(DeleteCommentDialogComponent, {
      width: '400px',
      height: '200px',
      data: { message: 'Tem certeza de que deseja excluir este comentário?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(deleteComment({ commentId }));
      }
    });
  }

  goToItemDetail(itemId: number): void {
    this.router.navigate(['/items', itemId]);
  }
}