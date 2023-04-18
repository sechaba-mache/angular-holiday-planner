import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  title = 'angular-holiday-planner';

  constructor(protected router: Router, private auth: AuthService) {
  }

  back() {
    this.router.navigate(["../../home/calendar"])
  }

  logout() {
    this.auth.logout().then(() => this.router.navigate(["../../login"]));
  }
}
