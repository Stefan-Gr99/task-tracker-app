import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TaskService } from '../../task.service';
import { Task } from '../../task';

@Component({
  selector: 'app-task-detail',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule
  ],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
})
export class TaskDetail {

  taskId: number | null = null;

  taskAusgabe = signal<Task | null>(null);

  constructor(private service: TaskService) { }

  public ladeTask(id: number | null): void {
    if (id === null) return;

    this.service.getTask(id).subscribe((data: Task) => {
      this.taskAusgabe.set(data);
      this.taskId = null;
    });
  }
}