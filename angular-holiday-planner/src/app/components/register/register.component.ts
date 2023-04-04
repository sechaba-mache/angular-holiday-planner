import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser} from "../../models/user";
import {catchError, first, switchMap} from "rxjs";
import { UserCredential } from '@angular/fire/auth';
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private auth: AuthService, private router: Router) { }

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$"), Validators.minLength(8)])
  })

  get email() {
    return this.registerForm.get("email")
  }

  get password() {
    return this.registerForm.get("password")
  }

  submitForm(){
    const user: IUser = {
      email: this.email?.value!,
      password: this.password?.value!,
    }

    fromPromise(this.auth.registerUser(user)).pipe(
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
