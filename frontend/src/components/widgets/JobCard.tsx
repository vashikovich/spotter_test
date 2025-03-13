import { Job } from "../../types/Location";

interface JobCardProps {
  job: Job;
  isSelected: boolean;
  onClick: () => void;
}

export function JobCard({ job, isSelected, onClick }: JobCardProps) {
  return (
    <div
      className={`p-4 border rounded flex flex-col gap-2 shadow-md ${
        isSelected ? "border-blue-500 shadow-blue-200" : "border-gray-300"
      }`}
      onClick={onClick}
    >
      <h3 className="text-xs font-semibold text-gray-400">Job #{job.id}</h3>
      <div className="flex justify-between mb-2">
        <div>
          <h3 className="text-sm font-semibold text-red-800">Pickup</h3>
          <p className="text-lg">{job.pickupName}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-green-800">Dropoff</h3>
          <p className="text-lg">{job.dropoffName}</p>
        </div>
      </div>
    </div>
  );
}
