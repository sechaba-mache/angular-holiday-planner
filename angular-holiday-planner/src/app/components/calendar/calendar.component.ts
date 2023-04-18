import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {IActivity, ITrip} from "../../models/trips";
import {selectUserTrips} from "../../store/selectors/firestore.selectors";
import {DatePipePipe} from "../../pipes/date-pipe.pipe";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  trips$: Observable<ITrip[]> | undefined
  datePipe = new DatePipePipe();
  constructor(private store: Store) {
    this.trips$ = store.select(selectUserTrips)
  }

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }

  getStatus(activity: IActivity) {

    const splitDate = this.datePipe.transform(activity.startDayTime.toString().toLowerCase()).split("at")
    const today = new Date(Date.now())
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    if(splitDate.length === 3){
      const eventDate = new Date(splitDate[1])
      if(eventDate <= nextWeek && eventDate > today){
        return "warning"
      }
      else if(eventDate > today ){
        return "success"
      }
      else {
        return "error"
      }
    }
    else {
      const eventDate = new Date(splitDate[0])
      if(eventDate <= nextWeek && eventDate > today){
        return "warning"
      }
      else if(eventDate > today){
        return "success"
      }
      else {
        return "error"
      }
    }
  }
}
