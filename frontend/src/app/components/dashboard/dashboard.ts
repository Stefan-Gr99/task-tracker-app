import { Component, computed } from '@angular/core';
import { TaskService } from '../../task.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    MatIconModule,
    NgFor
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

  
completionRate = computed(() => {
  const total = this.service.tasks().length;
  const finished = this.countByStatus('FERTIG');

  if (total === 0) {
    return 0;
  }

  return Math.round((finished / total) * 100);
});

donutGradient = computed(() => {
  const total = this.service.tasks().length;

  if (total === 0) {
    return 'conic-gradient(#e5e7eb 0 100%)';
  }

  const open = (this.countByStatus('NICHT_ANGEFANGEN') / total) * 100;
  const working = (this.countByStatus('IN_ARBEIT') / total) * 100;

  return `conic-gradient(
    #f59e0b 0 ${open}%,
    #3b82f6 ${open}% ${open + working}%,
    #10b981 ${open + working}% 100%
  )`;
});

last7Days = computed(() => {
  const tasks = this.service.tasks();
  const days: { label: string; count: number; height: number }[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - i);

    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);

    const count = tasks.filter(task => {
      if (!task.completedAt) {
        return false;
      }

      const completedAt = new Date(task.completedAt);
      return completedAt >= date && completedAt < nextDay;
    }).length;

    days.push({
      label: date.toLocaleDateString('de-DE', { weekday: 'short' }),
      count: count,
      height: 0
    });
  }

  const maxCount = Math.max(1, ...days.map(day => day.count));

  for (const day of days) {
    day.height = (day.count / maxCount) * 100;
  }

  return days;
});

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
