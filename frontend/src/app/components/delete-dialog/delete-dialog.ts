import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Task } from "../../task";

@Component({
  selector: 'confirm-dialog',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './delete-dialog.html',
  styleUrl: './delete-dialog.scss',
})
export class DeleteDialog {

  constructor(
    private dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) { }

  close(result: boolean) {
    this.dialogRef.close(result);
  }
}