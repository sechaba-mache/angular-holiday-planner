import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {tap} from "rxjs/operators";
import {ITrip} from "../../models/trips";
import {selectUserTrips} from "../../store/selectors/firestore.selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-trip-tile',
  templateUrl: './trip-tile.component.html',
  styleUrls: ['./trip-tile.component.scss']
})
export class TripTileComponent {

  trips$: Observable<ITrip[]> | undefined;
  rowCount = 0;
  showForm = false;

  constructor(private store: Store) {
    this.trips$ = store.select(selectUserTrips).pipe(
      tap(trips =>
        this.rowCount = trips.length
      )
    );
  }

  displayForm() {
    this.showForm = true;
  }
}
