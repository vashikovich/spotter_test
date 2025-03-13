import { TimeSegment } from "../../types";

interface ELDSheetProps {
  timeline: TimeSegment[];
  date: string;
}

export function ELDSheet({ timeline, date }: ELDSheetProps) {
  return (
    <div>
      <h3 className="font-semibold">Date: {date}</h3>
      <img
        src="/eld.svg"
        alt="ELD Diagram"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
