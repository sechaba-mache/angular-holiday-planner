import {inject, Injectable} from '@angular/core';
import {doc, Firestore, getDoc, setDoc, updateDoc} from "@angular/fire/firestore";
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
      switchMap(async (trip) => {console.log(trip.data()?.["trips"]); return trip.data()?.['trips'] as ITrip[]})
    )
  }

  addTrip(trip: ITrip, documentName: string) {
    const docRef = doc(this.firestore, "Trips", documentName);
    let currentTrips: ITrip[] | undefined;
    this.store.select(selectUserTrips).subscribe(res => currentTrips = res);
    if(currentTrips) {
      trip.tripID = String(currentTrips.length + 1)
      const newTrips: ITrip[] = [...currentTrips, trip];
      updateDoc(docRef, "trips", newTrips).then(res => console.log("success", res));
    }
    else{
      trip.tripID = String(0)
      setDoc(docRef, {trips: [trip]}).then(res => console.log("success current trips was undefined", res));
    }
  }

}
