import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Task } from "./task";

//TODO: HTML und CSS in eigene Datei auslagern

@Component({
  selector: 'confirm-dialog',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <h2 class="dialog-title">Task löschen?</h2>

    <p class="dialog-text">
      Möchtest du
      <span class="task-name">"{{ data.title }}"</span>
      wirklich löschen?
    </p>

    <div class="dialog-actions">
      <button mat-button (click)="close(false)">Abbrechen</button>
      <button mat-raised-button color="warn" (click)="close(true)">Löschen</button>
    </div>
  `,
  styles: [`
    .dialog-title {
      margin-bottom: 10px;
    }

    .dialog-text {
      margin-bottom: 20px;
      color: #555;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }

    .task-name {
      font-weight: bold;
      color: #192546;
    }
  `]
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