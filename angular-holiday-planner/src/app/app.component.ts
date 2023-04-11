import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "./store/reducers/firestore.reducer";
import {loadFirestores} from "./store/actions/firestore.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadFirestores())
  }
}
