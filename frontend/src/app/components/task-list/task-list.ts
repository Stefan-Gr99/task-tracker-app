import { CommonModule } from '@angular/common';
import { Component, OnInit, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from '../delete-dialog/delete-dialog';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { TaskService } from '../../task.service';
import { Task } from '../../task';
import { EditDialog } from '../edit-dialog/edit-dialog';

@Component({
  selector: 'app-task-list',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList implements OnInit {

  constructor(
    public service: TaskService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.ladeAlleTask();
  }

  readonly sortedTasks = computed(() => {
    const statusOrder: Record<string, number> = {
      IN_ARBEIT: 0,
      NICHT_ANGEFANGEN: 1,
      FERTIG: 2
    };

    return [...this.service.tasks()].sort((a, b) => {
      return statusOrder[a.status] - statusOrder[b.status];
    });
  });

  public ladeAlleTask(): void {
    this.service.loadTasks();
  }

  public deleteTask(task: Task | null): void {
    if (task === null) return;

    const dialogRef = this.dialog.open(DeleteDialog, {
      data: task,
      width: '500px',
      maxWidth: '90vw',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteTask(task.id).subscribe(() => {
          this.ladeAlleTask();
        });
      }
    });
  }

  public updateStatus(task: Task, newStatus: string): void {
    const changedTask: Partial<Task> = {
      status: newStatus
    };

    this.service.patchTask(task.id, changedTask).subscribe(() => {
      this.ladeAlleTask();
    });
  }

  public editTask(task: Task | null): void {
    if (task === null) return;

    const dialogRef = this.dialog.open(EditDialog, {
      data: { ...task },
      width: '520px',
      maxWidth: '90vw',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(
      (changes: Partial<Task> | undefined) => {
        if (!changes) return;

        this.service.patchTask(task.id, changes).subscribe({
          next: () => this.ladeAlleTask(),
          error: (err) => {
            console.error(
              'Aufgabe konnte nicht gespeichert werden:', err
            );
          }
        });
      }
    );
  }

  statusLabel(status: string): string {
    switch (status) {
      case 'NICHT_ANGEFANGEN':
        return 'Nicht angefangen';
      case 'IN_ARBEIT':
        return 'In Arbeit';
      case 'FERTIG':
        return 'Fertig';
      default:
        return status;
    }
  }
}
