import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(date: string): string {
    if(date.includes("timestamp")){
      const firstSplit = date.split("=")
      const secondSplit = firstSplit[1].split(",")
      const newDate = new Date(Number(secondSplit[0]) * 1000)

      const hours = newDate.getHours() == 0 ? "00" : newDate.getHours();
      const minutes = newDate.getMinutes() == 0 ? "00" : newDate.getMinutes();
      return newDate.toDateString() + " at " + String(hours + ":" + minutes)
    }
    return date;
  }

}
