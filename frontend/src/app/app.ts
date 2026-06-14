import { Component, signal, ViewChild } from '@angular/core';

import { TaskList } from './components/task-list/task-list';
import { TaskCreate } from './components/task-create/task-create';
import { TaskDetail } from './components/task-detail/task-detail';
import { Dashboard } from './components/dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [
    TaskList,
    TaskCreate,
    TaskDetail,
    Dashboard
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');

  @ViewChild(TaskList)
  taskList!: TaskList;

  public onTaskCreated(): void {
    this.taskList.ladeAlleTask();
  }
}