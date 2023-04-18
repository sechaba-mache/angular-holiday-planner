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
      // this.user = JSON.parse(sessionStorage.getItem("firebase:authUser:AIzaSyDqnu4jzVtNQ1ywyoFsZCskGZd5jvXAGH4:[DEFAULT]") ?? "")
  }

  registerUser(user: IUser){
    return this.auth.setPersistence(browserSessionPersistence).then(() => createUserWithEmailAndPassword(this.auth, user.email, user.password)).catch(() => window.alert("An error has occurred"))
  }

  login(user: IUser){
    return this.auth.setPersistence(browserSessionPersistence).then(() => signInWithEmailAndPassword(this.auth, user.email, user.password).then(res => this.user = res.user)).catch(() => window.alert("An error has occurred"));
  }

  logout() {
    this.loggedIn = false;
    this.user = null;
    return signOut(this.auth).catch(() => window.alert("An error has occurred"));
  }
}
