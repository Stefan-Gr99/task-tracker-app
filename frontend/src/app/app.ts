import { Component, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');

  tasks: any[] = [];

  halloAusgabe = signal("TEST");
  
  constructor(private service:TaskService) {
    this.ladeHallo();
      this.tasks = [
    { id: 1, title: "Einkaufen", status: "NICHT_ANGEFANGEN" },
    { id: 2, title: "Wohnung putzen", status: "IN_ARBEIT" },
    { id: 3, title: "Hausaufgaben machen", status: "FERTIG" }
  ];
  }

  public ladeHallo():void {
      this.service.getHallo().subscribe((data:string) => {
        this.halloAusgabe.set(data);
        console.log(data);
      });
    }

    //Add Taskmethode muss noch erstellt werden
}
