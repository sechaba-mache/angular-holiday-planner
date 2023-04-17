import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  browserSessionPersistence
} from "@angular/fire/auth";
import {IUser} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User | null | undefined;
  loggedIn = false;
  constructor(private auth: Auth) {
      this.user = JSON.parse(sessionStorage.getItem("firebase:authUser:AIzaSyDqnu4jzVtNQ1ywyoFsZCskGZd5jvXAGH4:[DEFAULT]") ?? "")
  }

  registerUser(user: IUser){
    return this.auth.setPersistence(browserSessionPersistence).then(() => createUserWithEmailAndPassword(this.auth, user.email, user.password))
  }

  login(user: IUser){
    return this.auth.setPersistence(browserSessionPersistence).then(() => signInWithEmailAndPassword(this.auth, user.email, user.password).then(res => this.user = res.user));
  }

  logout() {
    this.loggedIn = false;
    this.user = null;
    return signOut(this.auth);
  }
}
