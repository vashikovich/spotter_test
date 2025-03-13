export interface Coordinate {
  lat: number;
  long: number;
}

export interface Job {
  id: string;
  pickupLoc: Coordinate;
  dropoffLoc: Coordinate;
}

export interface Stop {
  lat: number;
  long: number;
  type: "current" | "fueling" | "pickup" | "dropoff" | "rest";
  desc: string;
}

export interface TimeSegment {
  start: number;
  end: number;
  type: string;
  desc: string;
}

export interface Routing {
  totalDuration: number;
  totalDistance: number;
  route: Coordinate[];
  stops: Stop[];
  timeline: TimeSegment[];
}

export interface Marker {
  lat: number;
  long: number;
  color: string;
  isLarge?: boolean;
}
