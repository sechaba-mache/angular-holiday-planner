import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {loadFirestores} from "../../store/actions/firestore.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  constructor(private router: Router, private store: Store) {
    this.store.dispatch(loadFirestores())
  }

  addTrip() {
    this.router.navigate(["../../home/add-trip"])
  }


}
