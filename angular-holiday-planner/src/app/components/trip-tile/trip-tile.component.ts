import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { tap } from "rxjs/operators";
import { ITrip } from "../../models/trips";
import { selectUserTrips } from "../../store/selectors/firestore.selectors";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { DatabaseService } from "../../services/database/database.service";
import { AuthService } from "../../services/auth/auth.service";
import { ITripForm } from "../../models/forms";
import { CurrencyConversionService } from "../../services/conversion/currency-conversion.service";

@Component({
  selector: 'app-trip-tile',
  templateUrl: './trip-tile.component.html',
  styleUrls: ['./trip-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripTileComponent implements OnInit {

  trips$: Observable<ITrip[]> | undefined;
  rowCount = 1;
  showForm = false;
  tripIndex: number | undefined;

  constructor(private store: Store, private router: Router, private database: DatabaseService, private auth: AuthService, protected currencyConverter: CurrencyConversionService) { }

  displayForm(index: number) {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.tripIndex = index
    }
    else {
      this.tripIndex = undefined;
    }
  }

  navigateToEdit(tripId: string) {
    this.router.navigate([`../../home/${tripId}`]);
  }

  ngOnInit(): void {
    this.trips$ = this.store.select(selectUserTrips).pipe(
      tap(trips => {
        if (trips !== undefined && trips.length > 0) {
          this.rowCount = trips.length + 1
        }
      }
      )
    )
  }

  deleteTrip(tripIndex: number) {
    this.database.deleteTrip(tripIndex, String(this.auth.user?.uid));
  }

  editForm(event: ITripForm, tripIndex: number) {
    this.database.updateTrip(event, tripIndex, String(this.auth.user?.uid));
  }
}
