export interface Coordinate {
  lat: number;
  long: number;
}

export interface Job {
  id: string;
  pickupLoc: Coordinate;
  dropoffLoc: Coordinate;
}

export type StopType = "current" | "fueling" | "pickup" | "dropoff" | "rest";

export interface Stop {
  lat: number;
  long: number;
  type: StopType;
  desc: string;
}

export type TimeSegmentType =
  | "off_duty"
  | "sleeper_berth"
  | "driving"
  | "on_duty";

export interface TimeSegment {
  start: number;
  end: number;
  type: TimeSegmentType;
  desc: string;
}

export interface Routing {
  totalDuration: number;
  totalDistance: number;
  route: Coordinate[];
  stops: Stop[];
  timeline: TimeSegment[];
  limitWarning: boolean;
}

export interface Marker {
  lat: number;
  long: number;
  color: string;
  isLarge?: boolean;
}
