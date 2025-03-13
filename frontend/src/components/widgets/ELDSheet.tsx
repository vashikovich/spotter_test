import { TimeSegment, TimeSegmentType } from "../../types";

interface ELDSheetProps {
  timeline: TimeSegment[];
  date: string;
}

const calcLeft = (time: number) => ((2 + time / 3600) / 26) * 100 + "%";
const calcRight = (time: number) => ((26 - 2 - time / 3600) / 26) * 100 + "%";
const calcTop = (type: TimeSegmentType) => {
  switch (type) {
    case "off_duty":
      return 10;
    case "sleeper_berth":
      return 30;
    case "driving":
      return 50;
    case "on_duty":
      return 70;
    default:
      return 0;
  }
};
const calcBottom = (type: TimeSegmentType) => {
  switch (type) {
    case "off_duty":
      return 70;
    case "sleeper_berth":
      return 50;
    case "driving":
      return 30;
    case "on_duty":
      return 10;
    default:
      return 0;
  }
};

const drawLines = (timeline: TimeSegment[]) => {
  const lines = [];
  for (let i = 0; i < timeline.length; i++) {
    const ts = timeline[i];
    const nextTs = timeline[i + 1];

    lines.push(
      <div
        className="absolute h-0.5 bg-black"
        style={{
          left: calcLeft(ts.start),
          right: calcRight(ts.end),
          top: calcTop(ts.type) + 20 + "%",
        }}
      />
    );

    if (nextTs) {
      lines.push(
        <div
          className="absolute w-0.5 bg-black"
          style={{
            left: calcLeft(ts.end),
            top: Math.min(calcTop(ts.type), calcTop(nextTs.type)) + 20 + "%",
            bottom: `calc(${
              Math.min(calcBottom(ts.type), calcBottom(nextTs.type)) + "%"
            } - 0.125rem)`,
          }}
        />
      );
    }
  }
  return lines;
};

export function ELDSheet({ timeline, date }: ELDSheetProps) {
  return (
    <div>
      <h3 className="font-semibold">Date: {date}</h3>
      <div className="relative">
        <img
          src="/eld.svg"
          alt="ELD Diagram"
          className="w-full h-full object-contain"
        />
        {drawLines(timeline)}
      </div>
    </div>
  );
}
