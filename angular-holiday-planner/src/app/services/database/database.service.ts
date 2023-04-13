import { inject, Injectable } from '@angular/core';
import { doc, Firestore, getDoc, setDoc, updateDoc } from "@angular/fire/firestore";
import { IActivity, ITrip } from "../../models/trips";
import { from, switchMap } from "rxjs";
import { Store } from "@ngrx/store";
import { selectUserTrips } from "../../store/selectors/firestore.selectors";
import { IActivityForm } from "../../models/forms";


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  firestore: Firestore = inject(Firestore);
  constructor(private store: Store) { }

  getUserTripsObs(documentName: string) {
    const docRef = doc(this.firestore, "Trips", documentName);

    return from(getDoc(docRef)).pipe(
      switchMap(async (trip) => { console.log(trip.data()?.["trips"]); return trip.data()?.['trips'] as ITrip[] })
    )
  }

  deleteTripActivity(tripIndex: number, activityIndex: number, documentName: string) {
    const docRef = doc(this.firestore, "Trips", documentName);
    let currentTrips: ITrip[] | undefined;
    this.store.select(selectUserTrips).subscribe(res => currentTrips = [...res]);
    if(currentTrips){
      const newTrips = currentTrips.map((trip, index) => {
        if(index === tripIndex) {
          return {...trip, itinerary:
              {...trip.itinerary, activities:
                  trip.itinerary.activities.slice(activityIndex + 1)
              }
          }
        }
        return trip;
      })

      updateDoc(docRef, "trips", newTrips)
    }
  }


  updateTrip(form: IActivityForm, tripIndex: number, activityIndex: number, documentName: string) {
    const docRef = doc(this.firestore, "Trips", documentName);
    let currentTrips: ITrip[] | undefined;
    this.store.select(selectUserTrips).subscribe(res => currentTrips = [...res]);
    console.log(tripIndex, currentTrips)
    if (currentTrips) {

      const newTrips = currentTrips.map((trip, index) => {
        if (index === tripIndex) {
          return {
            ...trip, itinerary:
            {
              ...trip.itinerary, activities:
                trip.itinerary.activities.map((activity, innerIndex) => {
                  if (innerIndex === activityIndex) {
                    return form as IActivity
                  }
                  return activity
                })
            }
          }
        }
        return trip
      })

      updateDoc(docRef, "trips", newTrips)
    }
  }

  addTrip(trip: ITrip, documentName: string) {
    const docRef = doc(this.firestore, "Trips", documentName);
    let currentTrips: ITrip[] | undefined;
    this.store.select(selectUserTrips).subscribe(res => currentTrips = res);
    if (currentTrips) {
      trip.tripID = String(currentTrips.length + 1)
      const newTrips: ITrip[] = [...currentTrips, trip];
      updateDoc(docRef, "trips", newTrips)
    }
    else {
      trip.tripID = String(0)
      setDoc(docRef, { trips: [trip] })
    }
  }

}
