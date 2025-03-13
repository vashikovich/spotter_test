import { TimeSegment, TimeSegmentType } from "../../types";

interface ELDSheetProps {
  timeline: TimeSegment[];
  date: string;
}

const calcLeft = (time: number) => ((2 + time / 3600) / 27.5) * 100 + "%";
const calcRight = (time: number) =>
  ((27.5 - 2 - time / 3600) / 27.5) * 100 + "%";
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

const totalHours = (timeline: TimeSegment[]) => {
  const offDuty = timeline
    .filter((ts) => ts.type === "off_duty")
    .reduce((acc, ts) => acc + ts.end - ts.start, 0);
  const sleepingBerth = timeline
    .filter((ts) => ts.type === "sleeper_berth")
    .reduce((acc, ts) => acc + ts.end - ts.start, 0);
  const driving = timeline
    .filter((ts) => ts.type === "driving")
    .reduce((acc, ts) => acc + ts.end - ts.start, 0);
  const onDuty = timeline
    .filter((ts) => ts.type === "on_duty")
    .reduce((acc, ts) => acc + ts.end - ts.start, 0);

  return [
    <p
      className="absolute text-lg text-center"
      style={{
        width: (1.5 / 27.5) * 100 + "%",
        right: 0,
        top: calcTop("off_duty") + 20 + "%",
        transform: "translateY(-50%)",
      }}
    >
      {(offDuty / 3600).toFixed(1)}
    </p>,
    <p
      className="absolute text-lg text-center"
      style={{
        width: (1.5 / 27.5) * 100 + "%",
        right: 0,
        top: calcTop("sleeper_berth") + 20 + "%",
        transform: "translateY(-50%)",
      }}
    >
      {(sleepingBerth / 3600).toFixed(1)}
    </p>,
    <p
      className="absolute text-lg text-center"
      style={{
        width: (1.5 / 27.5) * 100 + "%",
        right: 0,
        top: calcTop("driving") + 20 + "%",
        transform: "translateY(-50%)",
      }}
    >
      {(driving / 3600).toFixed(1)}
    </p>,
    <p
      className="absolute text-lg text-center"
      style={{
        width: (1.5 / 27.5) * 100 + "%",
        right: 0,
        top: calcTop("on_duty") + 20 + "%",
        transform: "translateY(-50%)",
      }}
    >
      {(onDuty / 3600).toFixed(1)}
    </p>,
  ];
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
        {totalHours(timeline)}
      </div>
    </div>
  );
}
