import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  private API_URL_USER = 'http://localhost:3000/api/user';
  private API_URL_TODO = 'http://localhost:3000/api/todolist';
  constructor(private httpClient: HttpClient) { }

  getToDoLists(firebaseUid: string): Observable<any> {
    return this.httpClient.post(`${this.API_URL_USER}/todos`, { userId: firebaseUid });
  }


  getToDoListById(id: string): Observable<any> {
    return this.httpClient.get(`${this.API_URL_TODO}/${id}`);
  }

  createToDoList(firebaseUid: string, toDoList: any): Observable<any> {
    const save = {
      ...toDoList,
      title: toDoList.title,
      dueDate: toDoList.dueDate,
      description: toDoList.description,
    }
    return this.httpClient.post(`${this.API_URL_USER}/${firebaseUid}/todolist`, {
      title: save.title,
      dueDate: save.dueDate,
      description: save.description,
    });
  }
  Delete(id: string) {
    return this.httpClient.delete(`${this.API_URL_TODO}/${id}`);
  }

  getToDoList(id: number): Observable<any> {
    return this.httpClient.get(`${this.API_URL_TODO}/${id}`);
  }

  updateToDoList(id: string, toDoList: any): Observable<any> {
    const save = {
      ...toDoList,
      title: toDoList.title,
      dueDate: toDoList.dueDate,
      description: toDoList.description,
    }
    return this.httpClient.put(`${this.API_URL_TODO}/${id}`, {
      title: save.title,
      dueDate: save.dueDate,
      description: save.description,
    });
  }
}
