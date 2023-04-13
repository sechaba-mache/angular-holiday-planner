export interface ITripForm {
  tripName: string,
  description: string,
  itineraryName: string,
  itineraryDescription: string
}

export interface IActivityForm {
  activityName: string,
  description: string,
  notes: string,
  startDayTime: number,
  endDayTime: number,
  cost: number,
  currency: string,
  startLocation: string,
  endLocation: string,
  travel: boolean
}
