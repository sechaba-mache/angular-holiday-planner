import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Currencies} from "../../models/currencies";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {IActivityForm} from "../../models/forms";

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent {

  @Output() activityOutputForm = new EventEmitter<IActivityForm>();
  @Output() submission = new EventEmitter<MouseEvent>()

  travel = false;
  selectedCurrency: string = "Select Currency";
  currencies = Object.values(Currencies).filter(val => {
    if(isNaN(Number(val))) return val;
    return
  })

  activityForm = new FormGroup({
    activityName: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    notes: new FormControl(''),
    startDayTime: new FormControl(''),
    endDayTime: new FormControl(''),
    cost: new FormControl('', [Validators.pattern("[0-9]+")]),
    startLocation: new FormControl(''),
    endLocation: new FormControl('')
  })

  flipTravel() {
    this.travel = !this.travel
  }

  setCurrency(currencyIndex: number) {
    this.selectedCurrency = this.currencies[currencyIndex] as string;
  }

  startValue: Date | null = null;
  endValue: Date | null = null;
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
    // console.log('handleStartOpenChange', open);
  }

  handleEndOpenChange(open: boolean): void {
    // console.log('handleEndOpenChange', open);
  }

  submitActivityForm(event: MouseEvent) {
    this.activityOutputForm.emit(({...this.activityForm.value, travel: this.travel, currency: this.selectedCurrency}) as IActivityForm)
    this.submission.emit(event);
  }
}
