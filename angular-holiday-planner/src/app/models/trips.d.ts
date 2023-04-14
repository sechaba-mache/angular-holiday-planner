export interface ITrip {
  tripID: string,
  tripName: string,
  description: string,
  itinerary: IItinerary
}

export interface IItinerary {
  activities: IActivity[],
  description: string,
  itineraryName: string
}

export interface IActivity {
  activityName: string,
  cost: number,
  currency: string,
  description: string,
  endLocation: string,
  endDayTime: number,
  notes: string,
  startLocation: string,
  startDayTime: number,
  travel: boolean,
}
