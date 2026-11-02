import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Task } from "../../task";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  imports: [
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  templateUrl: './edit-dialog.html',
  styleUrl: './edit-dialog.scss',
})
export class EditDialog {
  title: string = "";
  description: string = "";

  constructor(
    private dialogRef: MatDialogRef<EditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    this.title = data.title;
    this.description = data.description ?? '';
  }

  save(): void {
    const title = this.title.trim();

    if(!title) return;

    this.dialogRef.close({
      title: title,
      description: this.description.trim()
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
