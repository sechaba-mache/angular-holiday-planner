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
  tripIndex: number | undefined;
  activityIndex: number | undefined;
  selectedActivity: IActivity | undefined;
  showUpsertForm = false;
  showAddForm = false;

  constructor(private store: Store, private router: ActivatedRoute, private database: DatabaseService, private auth: AuthService) {
    this.activities$ = store.select(selectUserTrips).pipe(
      switchMap( async trips => trips.find(trip => trip.tripID === router.snapshot.paramMap.get("tripId"))),
    )

    this.activities$.pipe(first()).subscribe(trip => this.tripIndex = Number(trip?.tripID))
  }

  deleteActivity(activityIndex: number, tripIndex: number) {
    tripIndex--;
    this.database.deleteTripActivity(tripIndex, activityIndex, String(this.auth.user?.user.uid));
  }

  editActivity(event: IActivityForm, tripIndex: number, activityIndex: number) {
    tripIndex--;
    console.log(activityIndex)
    this.database.upsertTripActivity(event, tripIndex, activityIndex, String(this.auth.user?.user.uid));
  }

  createActivity(event: IActivityForm, tripIndex: number) {
    tripIndex--;
    this.database.addActivity(event, tripIndex, String(this.auth.user?.user.uid));
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
