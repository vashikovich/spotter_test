import { latlong } from "../../lib/utils";
import { Job } from "../../types";

interface JobCardProps {
  job: Job;
  isSelected: boolean;
  onClick: () => void;
}

export function JobCard({ job, isSelected, onClick }: JobCardProps) {
  return (
    <div
      className={`p-4 border rounded flex flex-col gap-2 shadow-md cursor-pointer ${
        isSelected ? "border-blue-500 shadow-blue-200" : "border-gray-300"
      }`}
      onClick={onClick}
    >
      <h3 className="text-xs font-semibold text-gray-400">Job #{job.id}</h3>
      <div className="flex">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-red-800">Pickup</h3>
          <p className="text-lg">{latlong(job.pickupLoc)}</p>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-green-800">Dropoff</h3>
          <p className="text-lg">{latlong(job.dropoffLoc)}</p>
        </div>
      </div>
    </div>
  );
}
