import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'app/models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private API_URL='http://localhost:3000/api/task';
  constructor(private httpClient: HttpClient) { }
  deleteTask(id: string) {
    return this.httpClient.delete(`${this.API_URL}/${id}`);
  }
  editTask(id: string, task: Task) {
    return this.httpClient.put(`${this.API_URL}/${id}`, {
      title: task.title,
      priority: task.priority,
      status: task.status,
    });
  }
}
