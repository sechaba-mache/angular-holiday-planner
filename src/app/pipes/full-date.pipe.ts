import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullDate'
})
export class FullDatePipe implements PipeTransform {

  transform(date: string): string {
    if (date.includes("timestamp")) {
      const firstSplit = date.split("=")
      const secondSplit = firstSplit[1].split(",")
      const newDate = new Date(Number(secondSplit[0]) * 1000)

      return newDate.toLocaleDateString();

    }
    return new Date(Date.now()).toLocaleDateString()
  }

}
