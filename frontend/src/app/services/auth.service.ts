import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User;
  private API_URL = 'http://localhost:3000/api/';
  constructor(private httpClient: HttpClient, public afAuth: AngularFireAuth) { }
  register(email: string, username: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        this.httpClient.post(`${this.API_URL}/create-user`, { username: username, firebaseUid: uid }).subscribe((response: User) => {
          localStorage.setItem('user', JSON.stringify(response));
          this.currentUser = response;
        });
      });
  }
  doEmailPasswordLogin(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((userCredential) => {
      var user = userCredential.user;
      const uid = user.uid;
      this.httpClient.post(`${this.API_URL}/user`, { firebaseUid: uid }).subscribe((response: User) => {
        localStorage.setItem('user', JSON.stringify(response));
        this.currentUser = response;
      })
    });
  }
  doLogout(): Promise<void> {
    localStorage.removeItem('user');
    return this.afAuth.signOut();
  }
  getCurrentUser(): User {
    return this.currentUser;
  }
}
