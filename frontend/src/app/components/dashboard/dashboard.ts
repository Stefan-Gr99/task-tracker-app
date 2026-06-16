import { Component } from '@angular/core';
import { TaskService } from '../../task.service';
import { MatCardModule } from '@angular/material/card';
import { C } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  constructor(public service: TaskService) { }

  public countByStatus(status: string): number {
    return this.service.tasks().filter(task => task.status === status).length;
  }

  private isInCurrentWeek(dateString: string): boolean {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();

    let monday = new Date();
    let sunday = new Date();

    let diff = 0;

    if (currentDay === 0) {
      diff = 6;
    } else {
      for (let i = currentDay; i > 1; i--) {
        diff++;
      }
    }

    monday.setDate(currentDate.getDate() - diff);
    monday.setHours(0, 0, 0, 0);

    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const checkDate = new Date(dateString);

    if (checkDate >= monday && checkDate <= sunday) {
      return true;
    }

    return false;
  }

  public createdThisWeek(): number {
    let count = 0;

    this.service.tasks().forEach(task => {
      if (this.isInCurrentWeek(task.createdAt)) {
        count++;
      }
    }
    );

    return count;
  }

  public completedThisWeek(): number {
    let count = 0;

    this.service.tasks().forEach(task => {
      if (task.completedAt != null) {
        if (this.isInCurrentWeek(task.completedAt)) {
          count++;
        }
      }
    })
    return count;
  }
}
