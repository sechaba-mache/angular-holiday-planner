import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ITripForm} from "../../models/forms";

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss']
})
export class TripFormComponent {

  @Output() tripOutputForm = new EventEmitter<ITripForm>();

  tripForm = new FormGroup({
    tripName: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    itineraryName: new FormControl('', [Validators.required]),
    itineraryDescription: new FormControl(''),
  });

  get tripName() {
    return this.tripForm.get("tripName");
  }

  get itineraryName() {
    return this.tripForm.get("itineraryName");
  }

  submitTripForm() {
    this.tripOutputForm.emit(this.tripForm.value as ITripForm);
  }
}
