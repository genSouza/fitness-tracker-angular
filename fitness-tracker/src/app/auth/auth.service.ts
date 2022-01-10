import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user!: User | null;
  private isAuthenticaded = false;
  /**
   * internal
   */
  constructor(private router: Router, private afAuth: AngularFireAuth) {}
  registerUser(authData: AuthData) {
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.authSuccessfully();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
        this.authSuccessfully();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    this.afAuth.signOut();
    this.isAuthenticaded = false;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  isAuth() {
    return this.isAuthenticaded;
  }

  private authSuccessfully() {
    this.isAuthenticaded = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
