import { Component, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');

  halloAusgabe = signal("TEST");
  
  constructor(private service:TaskService) {
    this.ladeHallo();
  }

  public ladeHallo():void {
      this.service.getHallo().subscribe((data:string) => {
        this.halloAusgabe.set(data);
        console.log(data);
      });
    }
}
