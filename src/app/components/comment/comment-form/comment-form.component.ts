import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommentModel } from '../../../models/comment.model';
import { Store } from '@ngrx/store';
import {
  createComment,
  updateComment,
} from '../../../store/commentStore/comment.actions';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css',
})
export class CommentFormComponent implements OnInit {
  commmentForm!: FormGroup;
  @Output() formSubmitted = new EventEmitter<void>();
  @Input() commentToEdit?: CommentModel;

  get buttonMsg(): string {
    return this.commentToEdit?.id ? 'Editar' : 'Comentar';
  }

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.commmentForm = this.formBuilder.group({
      comment: ['', [Validators.maxLength(254), Validators.minLength(3)]],
    });

    if (this.commentToEdit) {
      this.commmentForm.patchValue(this.commentToEdit);
    }
  }

  onSubmit() {
    if (this.commmentForm.valid && this.commentToEdit) {
      if (this.commentToEdit.id) {
        this.store.dispatch(
          updateComment({
            commentId: this.commentToEdit.id,
            updatedData: { ...this.commentToEdit, ...this.commmentForm.value },
          })
        );
      } else {
        this.store.dispatch(
          createComment({ comment: {...this.commentToEdit, ...this.commmentForm.value} })
        );
      }
      this.commmentForm.reset();
      this.formSubmitted.emit();
    } 
  }
}
