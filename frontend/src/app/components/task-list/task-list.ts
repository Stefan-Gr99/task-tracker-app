import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from '../delete-dialog/delete-dialog';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { TaskService } from '../../task.service';
import { Task } from '../../task';

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
          console.log("Task gelöscht");
          this.ladeAlleTask();
        });
      }
    });
  }

  public updateStatus(task: Task, newStatus: string): void {
    const changedTask: Partial<Task> = {
      status: newStatus
    }

    this.service.patchTask(task.id, changedTask).subscribe(() => {
      this.ladeAlleTask();
    });
  }
}