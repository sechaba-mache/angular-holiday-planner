import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Currencies} from "../../models/currencies";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {IActivityForm} from "../../models/forms";
import {IActivity} from "../../models/trips";

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnChanges {

  @Input() formData: IActivity |undefined;
  @Output() activityOutputForm = new EventEmitter<IActivityForm>();
  @Output() submission = new EventEmitter<MouseEvent>()

  ngOnChanges(changes: SimpleChanges): void {
    this.formData = changes?.['formData'].currentValue;
    this.activityForm.setValue({
      activityName: this.formData?.activityName ?? "",
      description: this.formData?.description ?? "",
      notes: this.formData?.notes ?? "",
      startDayTime: this.formData?.startDayTime ?? 0,
      endDayTime: this.formData?.endDayTime ?? 0,
      cost: this.formData?.cost ?? 0,
      startLocation: this.formData?.startLocation ?? "",
      endLocation: this.formData?.endLocation ?? ""
    })

    this.selectedCurrency = this.formData?.currency ?? "Select Currency"
    this.travel = this.formData?.travel ?? false;
  }


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
    startDayTime: new FormControl(0),
    endDayTime: new FormControl(0),
    cost: new FormControl(0, [Validators.pattern("[0-9]+")]),
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
