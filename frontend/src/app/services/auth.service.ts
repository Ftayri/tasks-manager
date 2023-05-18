import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:3000/create-user';
  constructor(private httpClient: HttpClient, public afAuth: AngularFireAuth) { }
  register(email: string, username: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        this.httpClient.post(this.API_URL, { username: username, firebaseUid: uid }).subscribe((response) => {
          console.log(response);
        });
      });
  }
  doEmailPasswordLogin(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((userCredential) => {
      // Signed in
      var user = userCredential.user;

    });
  }
  doLogout(): Promise<void> {
    return this.afAuth.signOut();
  }
}
