import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { TaskList } from './components/task-list/task-list';
import { Dashboard } from './components/dashboard/dashboard';
import { TaskActions } from './components/task-actions/task-actions';

@Component({
  selector: 'app-root',
  imports: [
    TaskList,
    TaskActions,
    Dashboard,
    MatIconModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  @ViewChild(TaskList)
  taskList!: TaskList;

  today = new Date().toLocaleDateString('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  public onTaskCreated(): void {
    this.taskList.ladeAlleTask();
  }
}