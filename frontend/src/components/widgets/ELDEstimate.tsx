import { useMemo } from "react";
import { TimeSegment } from "../../types";
import dayjs from "dayjs";
import { ELDSheet } from "./ELDSheet";
import { fragmentTimeline } from "../../lib/utils";

interface ELDEstimateProps {
  timeline: TimeSegment[];
}

export function ELDEstimate({ timeline }: ELDEstimateProps) {
  const dayTimelines = useMemo(() => fragmentTimeline(timeline), [timeline]);

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-2xl font-semibold">ELD Estimates</h3>
      {dayTimelines.map((tl, i) => {
        const date = dayjs().add(i, "day").format("MM/DD/YYYY");
        return <ELDSheet timeline={tl} date={date} key={i} />;
      })}
    </div>
  );
}
