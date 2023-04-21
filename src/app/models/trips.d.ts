export interface ITrip {
  tripID: string,
  tripName: string,
  description: string,
  itinerary: IItinerary,
  tripCost?: string
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
  endDayTime: Date,
  notes: string,
  startLocation: string,
  startDayTime: Date,
  travel: boolean,
}
