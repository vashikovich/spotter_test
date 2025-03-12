export interface Coordinate {
  lat: number;
  long: number;
}

export interface Job {
  id: string;
  pickupName: string;
  dropoffName: string;
  pickupLoc: Coordinate;
  dropoffLoc: Coordinate;
}