import { Stop } from "../../types";
import { cn, latlong } from "../../lib/utils";

interface StopCardProps {
  stop: Stop;
  setHovered: (latlong: string) => void;
}

export function StopCard({ stop, setHovered }: StopCardProps) {
  return (
    <div
      className="p-3 border rounded-lg shadow-md hover:border-blue-500 hover:shadow-blue-200"
      onMouseEnter={() => setHovered(latlong(stop))}
      onMouseLeave={() => setHovered("")}
    >
      <div className="text-sm text-gray-500">{latlong(stop)}</div>
      <div
        className={cn(
          "font-medium",
          stop.type === "current" && "text-blue-800",
          stop.type === "pickup" && "text-red-800",
          stop.type === "dropoff" && "text-green-800",
          stop.type === "fueling" && "text-yellow-800"
        )}
      >
        {stop.desc}
      </div>
    </div>
  );
}
