import { useContext } from "react";
import { JobCard } from "./JobCard";
import { JobContext } from "../../context/JobContext";

export function JobList() {
  const { selectedJob, selectJob, jobs } = useContext(JobContext);

  return (
    <div className="flex flex-col flex-1 gap-4 overflow-y-auto">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          isSelected={selectedJob?.id === job.id}
          onClick={() => selectJob(job)}
        />
      ))}
    </div>
  );
}
