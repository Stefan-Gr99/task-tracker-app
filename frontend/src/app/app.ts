import { Component, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from "./task";
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('frontend');

  tasks = signal<Task[]>([]);
  deleteTaskId: number = 0;
  taskId: number = 0;
  newTitle: string = "";
  newStatus: string = "NICHT_ANGEFANGEN";

  halloAusgabe = signal("TEST");
  taskAusgabe = signal<Task | null>(null);

  constructor(private service: TaskService) { }

  ngOnInit(): void {
    this.ladeAlleTask();
    this.ladeHallo();
  }

  public ladeHallo(): void {
    this.service.getHallo().subscribe((data: string) => {
      this.halloAusgabe.set(data);
      console.log(data);
    });
  }

  public ladeTask(id: number): void {
    this.service.getTask(id).subscribe((data: Task) => {
      this.taskAusgabe.set(data);
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

  public deleteTask(id: number): void {
    this.service.deleteTask(id).subscribe(() => {
      console.log("Task gelöscht");
      this.ladeAlleTask();
    });
  }
}
