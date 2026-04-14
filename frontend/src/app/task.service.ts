import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Task } from './task';


@Injectable({
    providedIn: 'root'
})

export class TaskService {
    constructor(private http: HttpClient) { }

    public getHallo(): Observable<string> {
        return this.http.get("http://localhost:8080/api/hallo", { responseType: 'text' });
    }

    public postTask(task: Partial<Task>): Observable<Task> {
        return this.http.post<Task>("http://localhost:8080/api/tasks", task);
    }

    public getTask(id: number): Observable<Task> {
        return this.http.get<Task>(`http://localhost:8080/api/tasks/${id}`);
    }

    public getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>("http://localhost:8080/api/tasks");
    }

    public deleteTask(id: number): Observable<void> {
        return this.http.delete<void>(`http://localhost:8080/api/tasks/${id}`);
    }
}