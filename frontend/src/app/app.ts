import { Component, signal, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskService } from './task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from "./task";
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskList } from './components/task-list/task-list';
import { TaskCreate } from './components/task-create/task-create';


@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    TaskList,
    TaskCreate],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');

  tasks = signal<Task[]>([]);
  taskId: number | null = null;
  deleteTaskId: number | null = null;

  taskAusgabe = signal<Task | null>(null);

  @ViewChild(TaskList)
  taskList!: TaskList;

  constructor(private service: TaskService, private dialog: MatDialog) { }

  public ladeTask(id: number | null): void {
    if (id === null) return;

    this.service.getTask(id).subscribe((data: Task) => {
      this.taskAusgabe.set(data);
      this.taskId = null;
    });
  }

  public onTaskCreated(): void {
    this.taskList.ladeAlleTask();
  }
}
