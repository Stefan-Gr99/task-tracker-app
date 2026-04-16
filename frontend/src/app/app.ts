import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from "./task";
import { OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('frontend');

  tasks = signal<Task[]>([]);
  taskId: number | null = null;
  deleteTaskId: number | null = null;
  newTitle: string = "";
  newStatus: string = "NICHT_ANGEFANGEN";

  taskAusgabe = signal<Task | null>(null);

  constructor(private service: TaskService) { }

  ngOnInit(): void {
    this.ladeAlleTask();
    this.ladeHallo();
  }

  public ladeHallo(): void {
    this.service.getHallo().subscribe((data: string) => {
      console.log(data);
    });
  }

  public ladeTask(id: number | null): void {
    if(id === null) return;

    this.service.getTask(id).subscribe((data: Task) => {
      this.taskAusgabe.set(data);
      this.taskId = null;
    });
  }

  public ladeAlleTask(): void {
    this.service.getTasks().subscribe((data: Task[]) => {
      this.tasks.set(data);
    });
  }

  public addTask(): void {
    const task: Partial<Task> = {
      title: this.newTitle,
      status: this.newStatus
    };

    this.service.postTask(task).subscribe(() => {
      console.log("Task erstellt");
      this.ladeAlleTask();
      this.newTitle = "";
    });
  }

  public deleteTask(id: number | null): void {
    if(id === null) return;
    this.service.deleteTask(id).subscribe(() => {
      console.log("Task gelöscht");
      this.ladeAlleTask();
      this.deleteTaskId = null;
    });
  }
}
