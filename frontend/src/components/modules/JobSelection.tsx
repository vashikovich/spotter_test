import { useContext } from "react";
import { JobList } from "../widgets/JobList";
import { Map } from "../widgets/Map";
import { JobContext } from "../../context/JobContext";
import { Button } from "../ui/button";
import { UsedHrsInput } from "../widgets/UsedHrsInput";

export function JobSelection() {
  const { selectedJob, jobs } = useContext(JobContext);

  if (!jobs.length) return <p>Loading...</p>;

  return (
    <div className="flex max-h-screen gap-4">
      <div className="w-3/5">
        <Map
          currentLoc={{ lat: 37.7749, long: -122.4194 }}
          pickupLoc={selectedJob?.pickupLoc}
          dropoffLoc={selectedJob?.dropoffLoc}
        />
      </div>
      <div className="w-2/5 flex flex-col gap-4">
        <UsedHrsInput />
        <JobList />
        <Button
          size="lg"
          className="px-4 self-end bg-blue-500 text-white rounded"
        >
          Calculate Route
        </Button>
      </div>
    </div>
  );
}
