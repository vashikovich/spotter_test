import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Coordinate, TimeSegment } from "../types";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function latlong(coord: Coordinate) {
  return `${coord.lat.toFixed(3)},${coord.long.toFixed(3)}`;
}

export function RandomizeCoord() {
  return {
    lat: 38 + (Math.random() * 10 - 5), // US lat range ~33-43
    long: -98 + (Math.random() * 40 - 20), // US long range ~-118 to -78
  };
}

export function fragmentTimeline(timeline: TimeSegment[]) {
  const DAY_SECONDS = 24 * 60 * 60;

  const offset = dayjs().unix() - dayjs().startOf("day").unix();
  let accum = 0;

  const result: TimeSegment[][] = [];
  let dayTimeline: TimeSegment[] = [];

  if (offset > 0) {
    dayTimeline.push({
      start: 0,
      end: offset,
      type: "off_duty",
      desc: "Off Duty",
    });
    accum += offset;
  }

  for (const segment of timeline) {
    const duration = segment.end - segment.start;

    // Segment not going past midnight
    if (accum + duration <= DAY_SECONDS) {
      dayTimeline.push({
        start: accum,
        end: accum + duration,
        type: segment.type,
        desc: segment.desc,
      });

      accum += duration;

      if (accum === DAY_SECONDS) {
        result.push(dayTimeline);
        dayTimeline = [];
      }

      // Segment is going past midnight
    } else {
      const firstDuration = DAY_SECONDS - accum;

      dayTimeline.push({
        start: accum,
        end: DAY_SECONDS,
        type: segment.type,
        desc: segment.desc,
      });

      result.push(dayTimeline);
      dayTimeline = [];

      dayTimeline.push({
        start: 0,
        end: duration - firstDuration,
        type: segment.type,
        desc: segment.desc,
      });

      accum = duration - firstDuration;
    }
  }

  // Set the rest of the day as off duty
  if (
    dayTimeline.length > 0 &&
    dayTimeline[dayTimeline.length - 1].end !== DAY_SECONDS
  ) {
    dayTimeline.push({
      start: accum,
      end: DAY_SECONDS,
      type: "off_duty",
      desc: "Off Duty",
    });
  }

  if (dayTimeline.length > 0) result.push(dayTimeline);

  return result;
}
