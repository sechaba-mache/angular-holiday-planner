import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser} from "../../models/user";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {catchError, first, switchMap} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";
import {UserCredential} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private auth: AuthService, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  get email() {
    return this.loginForm.get("email")
  }

  get password() {
    return this.loginForm.get("password")
  }

  submitLoginForm(){
    const user: IUser = {
      email: this.email?.value!,
      password: this.password?.value!,
    }

    fromPromise(this.auth.login(user)).pipe(
      first(),
      switchMap(async res => res),
      catchError(() => {return "error"})
    ).subscribe(user => {
      //If error stay on same route and ask user to resubmit else set relevant data and navigate to home route
      if(user !== "error"){
        this.auth.user = user as UserCredential;
        this.auth.loggedIn = true
      }

    });

    this.router.navigate(["../home/calendar"])

  }
}
