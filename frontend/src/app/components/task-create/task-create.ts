import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TaskService } from '../../task.service';
import { Task } from '../../task';

@Component({
  selector: 'app-task-create',
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule
  ],
  templateUrl: './task-create.html',
  styleUrl: './task-create.scss',
})
export class TaskCreate {

  @Output()
  taskCreated = new EventEmitter<void>();

  newTitle: string = "";
  newStatus: string = "NICHT_ANGEFANGEN";

  constructor(private service: TaskService) { }

  public addTask(): void {
    const task: Partial<Task> = {
      title: this.newTitle,
      status: this.newStatus
    };

    this.service.postTask(task).subscribe(() => {
      console.log("Task erstellt");
      this.taskCreated.emit();
      this.newTitle = "";
    });
  }
}
