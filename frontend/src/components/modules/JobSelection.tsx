import { useContext, useMemo } from "react";
import { JobList } from "../widgets/JobList";
import { Map } from "../widgets/Map";
import { JobContext } from "../../context/JobContext";
import { Button } from "../ui/button";
import { UsedHrsInput } from "../widgets/UsedHrsInput";
import { MainContext } from "../../context/MainContext";
import { Marker } from "../../types";

const current = { lat: 37.7749, long: -122.4194 };

export function JobSelection() {
  const { selectedJob, jobs, usedHrs } = useContext(JobContext);
  const { dispatch } = useContext(MainContext);

  const markers: Marker[] = useMemo(() => {
    if (!selectedJob) return [];
    else {
      return [
        { ...current, color: "blue" }, //currentLoc
        { ...selectedJob.pickupLoc, color: "red" },
        { ...selectedJob.dropoffLoc, color: "green" },
      ];
    }
  }, [selectedJob]);

  if (!jobs.length) return <p>Loading...</p>;

  return (
    <div className="flex max-h-screen gap-4">
      <div className="w-3/5">
        <Map markers={markers} />
      </div>
      <div className="w-2/5 flex flex-col gap-4">
        <UsedHrsInput />
        <JobList />
        <Button
          size="lg"
          className="px-4 self-end bg-blue-500 text-white rounded"
          disabled={!selectedJob}
          onClick={() =>
            dispatch({
              type: "GO_TO_ROUTING_DETAILS",
              payload: { job: selectedJob!, currentLoc: current, usedHrs },
            })
          }
        >
          Calculate Route
        </Button>
      </div>
    </div>
  );
}
