import { Component } from '@angular/core';
import {ITrip} from "../../models/trips";
import {Store} from "@ngrx/store";
import {selectUserTrips} from "../../store/selectors/firestore.selectors";
import {switchMap, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-activity-tile',
  templateUrl: './activity-tile.component.html',
  styleUrls: ['./activity-tile.component.scss']
})
export class ActivityTileComponent {

  activities$: Observable<ITrip | undefined> | undefined;
  constructor(private store: Store, private router: ActivatedRoute) {
    this.activities$ = store.select(selectUserTrips).pipe(
      switchMap( async trips => trips.find(trip => trip.tripID === router.snapshot.paramMap.get("tripId")))
    )

    this.activities$.pipe(tap(trip => console.log(trip))).subscribe()
  }

  deleteActivity(activityIndex: number) {

  }

  editActivity(activityIndex: number) {

  }
}
