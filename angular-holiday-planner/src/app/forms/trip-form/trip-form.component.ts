import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ITripForm} from "../../models/forms";

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss']
})
export class TripFormComponent implements OnChanges{

  @Input() formData: ITripForm |undefined;
  @Output() tripOutputForm = new EventEmitter<ITripForm>();
  @Output() submission = new EventEmitter<MouseEvent>()

  ngOnChanges(changes: SimpleChanges): void {
    this.formData = changes?.['formData'].currentValue;
    this.tripForm.setValue({
      tripName: this.formData?.tripName ?? "",
      description: this.formData?.description ?? "",
      itineraryName: this.formData?.itineraryName ?? "",
      itineraryDescription: this.formData?.itineraryDescription ?? ""
    })
  }

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
    this.submission.emit();
  }
}
