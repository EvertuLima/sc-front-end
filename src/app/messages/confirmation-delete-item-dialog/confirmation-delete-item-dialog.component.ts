import { Component, Inject } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmation-delete-item-dialog',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './confirmation-delete-item-dialog.component.html',
  styleUrl: './confirmation-delete-item-dialog.component.css',
})
export class ConfirmationDeleteItemDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDeleteItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
