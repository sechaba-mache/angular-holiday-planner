import {Component} from '@angular/core';
import {ITrip} from "../../models/trips";
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
  showActivityForm = false;

  constructor(private store: Store, private router: ActivatedRoute, private database: DatabaseService, private auth: AuthService) {
    this.activities$ = store.select(selectUserTrips).pipe(
      switchMap( async trips => trips.find(trip => trip.tripID === router.snapshot.paramMap.get("tripId"))),
    )

    this.activities$.pipe(first()).subscribe(trip => this.tripIndex = Number(trip?.tripID))
  }

  deleteActivity(activityIndex: number, tripIndex: number) {

  }

  editActivity() {
    this.showActivityForm = !this.showActivityForm;
  }

  getActivityForm(event: IActivityForm, tripIndex: number, activityIndex: number) {
    tripIndex--;
    this.database.updateTrip(event, tripIndex, activityIndex, String(this.auth.user?.user.uid));
  }
}
