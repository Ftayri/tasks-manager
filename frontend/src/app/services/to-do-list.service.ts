import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  private API_URL = 'http://localhost:3000/api/user';
  constructor(private httpClient: HttpClient) { }

  getToDoLists(firebaseUid: string): Observable<any>{
    return this.httpClient.post(`${this.API_URL}/todolists`, {firebaseUid: firebaseUid});
  }
}
