import { useContext } from "react";
import { JobList } from "../widgets/JobList";
import { Map } from "../widgets/Map";
import { JobContext } from "../../context/JobContext";

export function JobSelection() {
  const { selectedJob, jobs } = useContext(JobContext);
  
  if (!jobs.length) return <p>Loading...</p>;

  return (
    <div className="flex h-full">
      <div className="w-3/5">
        <Map
          currentLoc={{ lat: 37.7749, long: -122.4194 }}
          pickupLoc={selectedJob?.pickupLoc}
          dropoffLoc={selectedJob?.dropoffLoc}
        />
      </div>
      <div className="w-2/5 p-4 flex flex-col">
        <JobList />
        <button className="mt-4 px-4 py-2 self-end bg-blue-500 text-white rounded">
          Calculate Route
        </button>
      </div>
    </div>
  );
}
