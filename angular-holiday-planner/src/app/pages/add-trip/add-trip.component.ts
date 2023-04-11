import {Component} from '@angular/core';
import {IActivityForm, ITripForm} from "../../models/forms";
import {DatabaseService} from "../../services/database/database.service";
import {ITrip} from "../../models/trips";

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent{

  tripForm: ITripForm | undefined
  activityForm: IActivityForm | undefined

  constructor(private database: DatabaseService) {}
  getTripForm(event: ITripForm) {
    this.tripForm = event
  }

  getActivityForm(event: IActivityForm){
    this.activityForm = event
  }

  submitForm() {
    console.log("Submitting")
    const trip: ITrip = {
      description: this.tripForm?.description as string,
      itinerary: {
        activities: [{
          activityName: this.activityForm?.activityName as string,
          cost: Number(this.activityForm?.cost),
          currency: this.activityForm?.currency as string,
          description: this.activityForm?.description as string,
          endLocation: this.activityForm?.endLocation as string,
          endTime: Number(this.activityForm?.endDayTime),
          notes: this.activityForm?.notes as string,
          startLocation: this.activityForm?.startLocation as string,
          startTime: Number(this.activityForm?.startDayTime),
          travel: this.activityForm?.travel as boolean,
        }],
        description: this.tripForm?.itineraryDescription as string,
        itineraryName: this.tripForm?.itineraryName as string
      },
      tripID: "siufbiurw",
      tripName: this.tripForm?.tripName as string
    };

    this.database.addTrip(trip, "testUser")
  }
}
