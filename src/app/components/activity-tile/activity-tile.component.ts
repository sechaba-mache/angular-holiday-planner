import {Component} from '@angular/core';
import {IActivity, ITrip} from "../../models/trips";
import {Store} from "@ngrx/store";
import {selectUserTrips} from "../../store/selectors/firestore.selectors";
import {switchMap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {first, Observable} from "rxjs";
import {IActivityForm} from "../../models/forms";
import {DatabaseService} from "../../services/database/database.service";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-activity-tile',
  templateUrl: './activity-tile.component.html',
  styleUrls: ['./activity-tile.component.scss']
})
export class ActivityTileComponent {

  activities$: Observable<ITrip | undefined> | undefined;
  tripIndex = Number(this.router.snapshot.paramMap.get("tripId"))
  activityIndex: number | undefined;
  selectedActivity: IActivity | undefined;
  showUpsertForm = false;
  showAddForm = false;

  constructor(private store: Store, private router: ActivatedRoute, private database: DatabaseService, private auth: AuthService) {
    this.activities$ = store.select(selectUserTrips).pipe(
      switchMap( async trips => {
        return trips.find(trip => trip.tripID === router.snapshot.paramMap.get("tripId"))
      }),
    )
  }

  deleteActivity(activityIndex: number, tripIndex: number) {
    this.database.deleteTripActivity(tripIndex, activityIndex, String(this.auth.user?.uid));
  }

  editActivity(event: IActivityForm, tripIndex: number, activityIndex: number) {
    console.log(activityIndex)
    this.database.upsertTripActivity(event, tripIndex, activityIndex, String(this.auth.user?.uid));
  }

  createActivity(event: IActivityForm, tripIndex: number) {
    if(event.currency === "Select Currency") event.currency = "ZAR"
    this.database.addActivity(event, tripIndex, String(this.auth.user?.uid));

  }

  protected readonly Object = Object;

  flipAddForm() {

    this.showAddForm = !this.showAddForm;
    this.showUpsertForm = false;
  }

  flipUpsertForm(activityIndex: number) {
    this.showUpsertForm = !this.showUpsertForm;
    if(this.showUpsertForm) {
      this.activities$?.pipe(first()).subscribe(trip => {
        if(trip) this.selectedActivity = trip.itinerary.activities[activityIndex]
      });

      this.activityIndex = activityIndex;
    }
    else {
      this.activityIndex = undefined;
      this.selectedActivity = undefined;
    }
    this.showAddForm = false;
  }
}
