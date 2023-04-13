import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {tap} from "rxjs/operators";
import {ITrip} from "../../models/trips";
import {selectUserTrips} from "../../store/selectors/firestore.selectors";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-trip-tile',
  templateUrl: './trip-tile.component.html',
  styleUrls: ['./trip-tile.component.scss']
})
export class TripTileComponent implements OnInit{

  trips$: Observable<ITrip[]> | undefined;
  rowCount = 1;
  showForm = false;
  dropDown = false;

  constructor(private store: Store, private router: Router) {}

  displayForm() {
    this.showForm = true;
  }

  showDropDown() {
    this.dropDown = !this.dropDown;
  }

  navigateToEdit(tripId: string) {
    this.router.navigate([`../../home/${tripId}`]);
  }

  ngOnInit(): void {
    this.trips$ = this.store.select(selectUserTrips).pipe(
      tap(trips =>{
          if(trips !== undefined && trips.length > 0) this.rowCount = trips.length + 1
        }
      )
    )
  }
}
