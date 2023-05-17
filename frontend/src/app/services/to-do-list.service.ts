import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  private API_URL = 'http://localhost:3000/api/user';
  constructor(private httpClient: HttpClient) { }

  getToDoLists(firebaseUid: string): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/todos`, { userId: firebaseUid });
  }

  createToDoList(firebaseUid: string, toDoList: any): Observable<any>{
    const save = {...toDoList,
    title: toDoList.title,
    dueDate: toDoList.dueDate,
    description: toDoList.description,}
    return this.httpClient.post(`${this.API_URL}/${firebaseUid}/todolist`, {
      title: save.title,
      dueDate: save.dueDate,
      description: save.description,
    });
  }
}
