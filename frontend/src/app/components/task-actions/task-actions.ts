import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { TaskService } from '../../task.service';
import { Task } from '../../task';

@Component({
  selector: 'app-task-actions',
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './task-actions.html',
  styleUrl: './task-actions.scss',
})
export class TaskActions {

  @Output()
  taskCreated = new EventEmitter<void>();

  newTitle: string = "";
  newStatus: string = "NICHT_ANGEFANGEN";

  taskId: number | null = null;
  taskAusgabe = signal<Task | null>(null);

  constructor(private service: TaskService) { }

  public addTask(): void {
    if (!this.newTitle.trim()) {
      return;
    }

    const task: Partial<Task> = {
      title: this.newTitle.trim(),
      status: this.newStatus
    };

    this.service.postTask(task).subscribe(() => {
      console.log("Task erstellt");
      this.taskCreated.emit();
      this.newTitle = "";
    });
  }

  public ladeTask(id: number | null): void {
    if (id === null) {
      return;
    }

    this.service.getTask(id).subscribe((data: Task) => {
      this.taskAusgabe.set(data);
      this.taskId = null;
    });
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
