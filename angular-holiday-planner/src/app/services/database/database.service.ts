import {inject, Injectable} from '@angular/core';
import {doc, Firestore, getDoc, updateDoc} from "@angular/fire/firestore";
import { ITrip} from "../../models/trips";
import {from, switchMap} from "rxjs";
import {Store} from "@ngrx/store";
import {selectUserTrips} from "../../store/selectors/firestore.selectors";


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  firestore: Firestore = inject(Firestore);
  constructor(private store: Store) {}

  getUserTripsObs(documentName: string){
    const docRef = doc(this.firestore, "Trips", documentName);

    return from(getDoc(docRef)).pipe(
      switchMap(async (trip) => trip.data()?.['trips'] as ITrip[])
    )
  }

  addTrip(trip: ITrip, documentName: string) {
    const docRef = doc(this.firestore, "Trips", documentName);

    let currentTrips: ITrip[] | undefined;
    this.store.select(selectUserTrips).subscribe(res => currentTrips = res);

    if(currentTrips) {
      const newTrips: ITrip[] = [...currentTrips, trip];
      updateDoc(docRef, "trips", newTrips).then(res => console.log("success", res));
    }
  }

}
