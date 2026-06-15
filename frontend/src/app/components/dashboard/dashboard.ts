import { Component } from '@angular/core';
import { TaskService } from '../../task.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  constructor(public service: TaskService) {}

  public countByStatus(status: string): number {
    return this.service.tasks().filter(task => task.status === status).length;
  }

  private isInCurrentWeek(dateString: string): boolean {
    const today = new Date();
    const day = today.getDay();

    //TODO: Funktion beenden

    return false;
  }

}
