import { Stop } from "../../types";
import { latlong } from "../../lib/utils";
import { StopCard } from "./StopCard";

interface StopListProps {
  stops: Stop[];
  setHovered: (latlong: string) => void;
}

export function StopList({ stops, setHovered }: StopListProps) {
  return (
    <div className="w-96 bg-white rounded-lg overflow-y-auto">
      <h3 className="font-semibold mb-4">Route Stops</h3>
      <div className="space-y-4">
        {stops.map((stop) => (
          <StopCard
            key={latlong(stop)}
            stop={stop}
            setHovered={setHovered}
          />
        ))}
      </div>
    </div>
  );
}
