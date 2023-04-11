import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential
} from "@angular/fire/auth";
import {IUser} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: UserCredential | null = null;
  loggedIn = false;
  constructor(private auth: Auth) { }

  registerUser(user: IUser){
    return createUserWithEmailAndPassword(this.auth, user.email, user.password)
  }

  login(user: IUser){
    return signInWithEmailAndPassword(this.auth, user.email, user.password)
  }

  logout() {
    this.loggedIn = false;
    this.user = null;
    return signOut(this.auth);
  }
}
