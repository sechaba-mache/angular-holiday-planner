import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(date: string): string {
    const firstSplit = date.split("=")
    const secondSplit = firstSplit[1].split(",")
    const newDate = new Date(Number(secondSplit[0]) * 1000)
    return newDate.toDateString() + " at " + String(newDate.getHours() + ":" + newDate.getMinutes())
  }

}
