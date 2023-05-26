import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private API_URL = '/api/dashboard';
  constructor(private httpClient: HttpClient) { }
  tasksStats(firebaseUid: string): Observable<any>{
    return this.httpClient.post(`${this.API_URL}/tasks`, {firebaseUid: firebaseUid});
  }
  todoListsStats(firebaseUid: string): Observable<any>{
    return this.httpClient.post(`${this.API_URL}/todolists`, {firebaseUid: firebaseUid});
  }
}
