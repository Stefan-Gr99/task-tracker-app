import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

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
    MatIconModule,
    DatePipe
  ],
  templateUrl: './task-actions.html',
  styleUrl: './task-actions.scss'
})
export class TaskActions {

  @Output()
  taskCreated = new EventEmitter<void>();

  newTitle: string = "";
  newStatus: string = "NICHT_ANGEFANGEN";

  searchText: string = "";
  searchResults: Task[] = [];
  searched: boolean = false;

  selectedTaskId: number | null = null;

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

  public searchTasks(): void {
    const text = this.searchText.trim().toLowerCase();

    if (!text) {
      this.searchResults = [];
      this.searched = false;
      this.selectedTaskId = null;
      return;
    }

    this.searchResults = this.service.tasks().filter(task =>
      task.title.toLowerCase().includes(text)
    );

    this.selectedTaskId = null;
    this.searched = true;
  }

  public toggleDetails(id: number): void {
    this.selectedTaskId = this.selectedTaskId === id ? null : id;
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
