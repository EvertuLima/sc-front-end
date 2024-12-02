import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-comment-dialog',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './delete-comment-dialog.component.html',
  styleUrl: './delete-comment-dialog.component.css'
})
export class DeleteCommentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
