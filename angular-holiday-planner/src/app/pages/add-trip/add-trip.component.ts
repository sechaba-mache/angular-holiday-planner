import {Component} from '@angular/core';
import {IActivityForm, ITripForm} from "../../models/forms";
import {DatabaseService} from "../../services/database/database.service";
import {ITrip} from "../../models/trips";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent{

  tripForm: ITripForm | undefined
  activityForm: IActivityForm | undefined

  constructor(private database: DatabaseService, private auth: AuthService) {}
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
          endDayTime: Number(this.activityForm?.endDayTime),
          notes: this.activityForm?.notes as string,
          startLocation: this.activityForm?.startLocation as string,
          startDayTime: Number(this.activityForm?.startDayTime),
          travel: this.activityForm?.travel as boolean,
        }],
        description: this.tripForm?.itineraryDescription as string,
        itineraryName: this.tripForm?.itineraryName as string
      },
      tripID: "",
      tripName: this.tripForm?.tripName as string
    };

    if(this.auth.user) this.database.addTrip(trip, this.auth.user?.user.uid)
  }
}
