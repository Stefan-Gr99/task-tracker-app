import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class TaskService {
    constructor(private http:HttpClient) {}

    public getHallo(): Observable<string>{
        return this.http.get("http://localhost:8080/api/hallo", {responseType: 'text'});
    }

    public postTask(task:any): Observable<any> {
        return this.http.post("http://localhost:8080/api/tasks", task); //Observable später zu task ändern
    }
}