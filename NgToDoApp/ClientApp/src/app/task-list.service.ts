import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})

export class TaskListService {

  public TaskList: Task[] = [{ description: "TESTYO", completed: false, dateCreated: "010101" }];
  
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  public getTaskList(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + 'api/Session/SessionTasks');
  }

  public addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + 'api/Session/SessionPost', task);
  }

  public editTask(index: number, updatedTask: Task) {
    return this.http.put<Task>(this.baseUrl + 'api/Session/SessionPut/'+index, updatedTask);
  }

  public deleteTask(index: number): Observable<number> {
    return this.http.delete<number>(this.baseUrl + 'api/Session/SessionDelete/'+index);
  }
}
