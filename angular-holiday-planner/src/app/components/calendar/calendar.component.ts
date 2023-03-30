import { Component } from '@angular/core';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  date = new Date(Date.now());
  mode: NzCalendarMode = 'month';

  panelChange(change: { date: Date; mode: string }): void {
    // console.log(change.date, change.mode);
  }

  changed(selected: Date) {
    // console.log(selected)
  }
}
